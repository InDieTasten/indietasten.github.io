#!/bin/bash

# Auto-update Projects Data from GitHub API
# This script fetches repository data from the InDieTasten GitHub organization
# and generates a YAML file containing project information.

set -e

# Configuration
OWNER="InDieTasten"
OUTPUT_FILE="_data/projects.yml"
PER_PAGE=100

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

# Check if js-yaml is available
if ! node -e "require('js-yaml')" 2>/dev/null; then
    log "Installing js-yaml dependency..."
    npm install js-yaml
fi

# Create output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

log "Fetching repositories from GitHub API..."

# Use Node.js to fetch and process repository data
node << 'EOF'
const fs = require('fs');
const yaml = require('js-yaml');

async function fetchAllRepos() {
    const owner = process.env.OWNER || 'InDieTasten';
    const perPage = parseInt(process.env.PER_PAGE || '100');
    const token = process.env.GITHUB_TOKEN;
    
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'indietasten-projects-bot'
    };
    
    // Add token if available (works without token too, but with rate limits)
    if (token) {
        headers['Authorization'] = `token ${token}`;
    }
    
    let allRepos = [];
    let page = 1;
    let hasMore = true;
    
    try {
        // Fetch all pages of repositories
        while (hasMore) {
            const url = `https://api.github.com/users/${owner}/repos?type=public&per_page=${perPage}&page=${page}&sort=updated`;
            console.log(`Fetching page ${page}...`);
            
            const response = await fetch(url, { headers });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch repos (page ${page}): ${response.status} ${response.statusText}`);
            }
            
            const repos = await response.json();
            
            if (repos.length === 0) {
                hasMore = false;
            } else {
                allRepos = allRepos.concat(repos);
                page++;
                
                // GitHub API rate limiting - add small delay between requests
                if (page > 1) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
            }
        }
        
        console.log(`Found ${allRepos.length} total repositories across ${page - 1} pages`);
        
        const projects = [];
        
        for (const repo of allRepos) {
            // Skip forks unless they have significant activity
            if (repo.fork && repo.stargazers_count === 0) continue;
            
            // Skip the indietasten.github.io repository itself
            if (repo.name === 'indietasten.github.io') continue;
            
            // Determine status based on repository topics
            let status = 'in-progress'; // Default status
            
            const topics = repo.topics || [];
            
            if (topics.includes('status-done')) {
                status = 'done';
            } else if (repo.archived) {
                status = 'abandoned';
            } else if (repo.pushed_at) {
                const lastPush = new Date(repo.pushed_at);
                const sixMonthsAgo = new Date();
                sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                
                if (lastPush < sixMonthsAgo) {
                    status = 'abandoned';
                }
            }
            
            // Extract tags from topics (excluding status tags)
            const tags = topics.filter(topic => !topic.startsWith('status-'));
            
            // Add primary language as a tag if available
            if (repo.language && !tags.includes(repo.language)) {
                tags.unshift(repo.language);
            }
            
            // Try to get repository's actual OpenGraph image first
            let ogImage = null;
            
            // Try to extract OpenGraph image from repository HTML page
            try {
                const repoPageResponse = await fetch(repo.html_url, {
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; ProjectFetcher/1.0)',
                        'Accept': 'text/html,application/xhtml+xml'
                    }
                });
                
                if (repoPageResponse.ok) {
                    const htmlContent = await repoPageResponse.text();
                    // Extract OpenGraph image from meta tag
                    const ogImageMatch = htmlContent.match(/<meta property="og:image" content="([^"]*)"[^>]*>/i);
                    if (ogImageMatch && ogImageMatch[1]) {
                        ogImage = ogImageMatch[1];
                    }
                }
            } catch (error) {
                console.log(\`Could not fetch repository page for \${repo.full_name}: \${error.message}\`);
            }
            
            // Use the dynamic OpenGraph image as fallback
            if (!ogImage) {
                ogImage = \`https://opengraph.githubassets.com/1/\${repo.full_name}\`;
            }
            
            const project = {
                name: repo.name,
                status: status,
                description: repo.description || 'No description available.',
                github_link: repo.html_url,
                website: repo.homepage || null,
                tags: tags.length > 0 ? tags : ['Miscellaneous'],
                language: repo.language,
                created_at: repo.created_at,
                updated_at: repo.updated_at,
                og_image: ogImage,
                archived: repo.archived
            };
            
            projects.push(project);
        }
        
        // Sort projects by status (done, in-progress, abandoned) and then by updated date
        projects.sort((a, b) => {
            const statusOrder = { 'done': 0, 'in-progress': 1, 'abandoned': 2 };
            const statusDiff = statusOrder[a.status] - statusOrder[b.status];
            if (statusDiff !== 0) return statusDiff;
            
            // Within same status, sort by updated date descending
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
        
        console.log(`Generated ${projects.length} projects`);
        console.log(`Status breakdown:`);
        const statusCounts = projects.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {});
        Object.entries(statusCounts).forEach(([status, count]) => {
            console.log(`  ${status}: ${count}`);
        });
        
        // Generate YAML file
        const yamlContent = yaml.dump(projects, {
            indent: 2,
            lineWidth: 120,
            quotingType: '"',
            forceQuotes: false
        });
        
        // Write to file
        const outputFile = process.env.OUTPUT_FILE || '_data/projects.yml';
        fs.writeFileSync(outputFile, yamlContent);
        console.log(`Projects YAML file generated successfully: ${outputFile}`);
        
    } catch (error) {
        console.error('Error fetching repository data:', error);
        process.exit(1);
    }
}

// Set environment variables and run
process.env.OWNER = process.env.OWNER || 'InDieTasten';
process.env.PER_PAGE = process.env.PER_PAGE || '100';
process.env.OUTPUT_FILE = process.env.OUTPUT_FILE || '_data/projects.yml';

fetchAllRepos();
EOF

log "Projects data generation completed successfully!"