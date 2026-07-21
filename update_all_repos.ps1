Write-Host "=========================================" -ForegroundColor Yellow
Write-Host " Updating Dhara Foundations GitHub Repos" -ForegroundColor Yellow
Write-Host " Repositories:" -ForegroundColor Yellow
Write-Host " 1. https://github.com/sounderrajan-07/dhara-divine-awards.git" -ForegroundColor Yellow
Write-Host " 2. https://github.com/projectsatriowings/dharadivineawards.git" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Yellow

# 1. Staging and Committing Changes
Write-Host "`nStaging files..." -ForegroundColor Cyan
git add .

Write-Host "Creating commit..." -ForegroundColor Cyan
git commit -m "Unified single-project architecture: /admin page route, root serverless API, and cleaned structure"

# 2. Pushing to Default Origin
Write-Host "`nPushing to default remote (origin)..." -ForegroundColor Cyan
git push

# 3. Pushing to Repo 1
Write-Host "Pushing to https://github.com/sounderrajan-07/dhara-divine-awards.git..." -ForegroundColor Cyan
git push https://github.com/sounderrajan-07/dhara-divine-awards.git HEAD:main

# 4. Pushing to Repo 2
Write-Host "Pushing to https://github.com/projectsatriowings/dharadivineawards.git..." -ForegroundColor Cyan
git push https://github.com/projectsatriowings/dharadivineawards.git HEAD:main

Write-Host "`nSuccessfully pushed changes to all GitHub repositories!" -ForegroundColor Green
