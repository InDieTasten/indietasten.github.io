#!/usr/bin/env node

/**
 * Download Project Images Script
 * Downloads custom repository images for projects during build time
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const log = (message) => console.log(`[INFO] ${message}`);
const warn = (message) => console.log(`[WARN] ${message}`);
const error = (message) => {
    console.error(`[ERROR] ${message}`);
    process.exit(1);
};

async function downloadProjectImages() {
    const projectsFile = path.join(process.cwd(), '_data', 'projects.yml');
    const imagesDir = path.join(process.cwd(), 'public', 'project-images');
    
    // Check if projects file exists
    if (!fs.existsSync(projectsFile)) {
        error('projects.yml not found. Please run fetch-projects.sh first.');
    }
    
    // Load projects data
    log('Loading projects data...');
    const fileContents = fs.readFileSync(projectsFile, 'utf8');
    const projects = yaml.load(fileContents);
    
    // Create images directory
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
        log('Created project-images directory');
    }
    
    // Download images for projects with custom_image_url
    const projectsWithImages = projects.filter(project => project.custom_image_url);
    
    if (projectsWithImages.length === 0) {
        log('No projects with custom images found');
        return;
    }
    
    log(`Found ${projectsWithImages.length} projects with custom images`);
    
    for (const project of projectsWithImages) {
        try {
            const imageUrl = project.custom_image_url;
            const imagePath = project.og_image; // This is the local path like "/project-images/filename"
            
            if (!imagePath || !imagePath.startsWith('/project-images/')) {
                warn(`Skipping ${project.name}: Invalid image path`);
                continue;
            }
            
            // Extract filename from the path
            const filename = path.basename(imagePath);
            const fullPath = path.join(imagesDir, filename);
            
            // Skip if image already exists
            if (fs.existsSync(fullPath)) {
                log(`Image already exists for ${project.name}, skipping`);
                continue;
            }
            
            log(`Downloading image for ${project.name}...`);
            
            const response = await fetch(imageUrl);
            if (!response.ok) {
                warn(`Failed to download image for ${project.name}: ${response.status} ${response.statusText}`);
                continue;
            }
            
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            
            // Determine correct file extension based on content type or magic bytes
            let extension = '.jpg'; // default
            const contentType = response.headers.get('content-type');
            if (contentType) {
                if (contentType.includes('png')) {
                    extension = '.png';
                } else if (contentType.includes('gif')) {
                    extension = '.gif';
                } else if (contentType.includes('webp')) {
                    extension = '.webp';
                }
            } else {
                // Check magic bytes for GIF
                if (buffer.length >= 3 && 
                    buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
                    extension = '.gif';
                } else if (buffer.length >= 8 &&
                    buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
                    extension = '.png';
                }
            }
            
            // Update filename with correct extension
            const baseFilename = filename.replace(/\.[^.]+$/, ''); // Remove existing extension
            const correctedFilename = baseFilename + extension;
            const correctedPath = path.join(imagesDir, correctedFilename);
            
            fs.writeFileSync(correctedPath, buffer);
            log(`Downloaded and saved: ${correctedFilename}`);
            
            // If the filename changed, we need to update the project data
            if (correctedFilename !== filename) {
                log(`Updated filename for ${project.name}: ${filename} -> ${correctedFilename}`);
                project.og_image = `/project-images/${correctedFilename}`;
            }
            
        } catch (err) {
            warn(`Error downloading image for ${project.name}: ${err.message}`);
        }
    }
    
    // Update the projects file with any corrected filenames
    const updatedYaml = yaml.dump(projects, {
        indent: 2,
        lineWidth: 120,
        quotingType: '"',
        forceQuotes: false
    });
    
    fs.writeFileSync(projectsFile, updatedYaml);
    log('Project images download completed');
}

// Run the script
if (require.main === module) {
    downloadProjectImages().catch(error => {
        console.error('Failed to download project images:', error);
        process.exit(1);
    });
}

module.exports = { downloadProjectImages };