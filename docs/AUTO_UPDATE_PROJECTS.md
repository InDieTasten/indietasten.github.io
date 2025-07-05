# Auto-Update Projects Workflow

This document explains the automated project data generation system implemented for the indietasten.github.io website.

## Overview

The system automatically fetches public repository data from the InDieTasten GitHub organization and generates a structured YAML file containing project information. This eliminates the need to manually maintain the projects list and ensures it stays up-to-date with the latest repository information.

## How It Works

### 1. Scheduled Execution
- **Daily at 2:00 AM UTC**: The workflow automatically runs to check for updates
- **Manual trigger**: Can be triggered manually from GitHub Actions tab

### 2. Data Collection
The workflow fetches the following data for each public repository:
- Repository name, description, and URL
- Primary language and repository topics (used as tags)
- Creation and last update timestamps
- Homepage/website URL
- Archived status
- OpenGraph social preview image

### 3. Smart Status Classification
Projects are automatically classified based on activity:
- **Done**: Repositories tagged with "status-done" topic
- **In Progress**: Repositories with commits within the last 6 months
- **Abandoned**: Archived repositories or those inactive for 6+ months

### 4. File Generation
The workflow generates:
- `_data/projects.yml`: Primary YAML data file

### 5. Automated Pull Requests
When changes are detected, the workflow:
- Creates a new branch with timestamp suffix
- Commits the updated data files
- Opens a pull request with detailed change information
- Cleans up the branch after merge

## Testing the Workflow

### Manual Trigger
1. Go to the GitHub repository
2. Navigate to Actions → Auto-update Projects
3. Click "Run workflow" → "Run workflow"
4. Monitor the execution in the Actions tab

### Local Testing
You can test the data generation logic locally:

```bash
# Run the fetch script locally
./scripts/fetch-projects.sh

# The script will work without a GitHub token but with rate limits
# For better rate limits, set GITHUB_TOKEN environment variable:
GITHUB_TOKEN=your_token ./scripts/fetch-projects.sh
```

## Configuration

### Repository Filtering
The workflow automatically:
- Fetches all pages of repositories (handles 100+ repositories)
- Skips the `indietasten.github.io` repository itself
- Excludes forks with no stars or activity
- Processes all other public repositories

### Customization
To modify the workflow behavior:
- Edit `scripts/fetch-projects.sh` to change the data fetching logic
- Edit `.github/workflows/auto-update-projects.yml` to change the schedule
- Modify status classification by adjusting the topics filtering in the script

## File Structure

```
_data/
├── projects.yml     # Primary YAML data file (auto-generated)
└── projects-sample.yml  # Example of the new format

.github/workflows/
└── auto-update-projects.yml  # GitHub Action workflow

scripts/
└── fetch-projects.sh  # Repository data fetching script

src/lib/
└── api.ts          # YAML data loading

src/app/projects/
└── page.tsx        # Enhanced projects page with metadata display
```

## Troubleshooting

### Workflow Fails
1. Check the Actions tab for error details
2. Verify GitHub token permissions
3. Ensure repository access is not restricted

### Data Not Updating
1. Check if there are actual changes in repositories
2. Verify the workflow completed successfully
3. Look for the auto-generated pull request

### Build Errors
1. Ensure YAML file exists
2. Verify file format is valid
3. Check for syntax errors in generated data

## Benefits

1. **Always Up-to-Date**: Project list reflects current repository state
2. **Rich Metadata**: Includes languages, topics, and activity data based on repository topics
3. **Automated**: No manual maintenance required
4. **Transparent**: All changes reviewed via pull requests
5. **Flexible**: Easy to customize classification and data fields via script modification