Write-Host "=========================================" -ForegroundColor Gold
Write-Host " Updating Dhara Foundations GitHub Repos" -ForegroundColor Gold
Write-Host "=========================================" -ForegroundColor Gold

# 1. Update Main Promotional Page Repo
Write-Host "`n[1/2] Staging and committing Main Promotional Page..." -ForegroundColor Cyan
git add .
git commit -m "Make all subdomain & main page contents dynamic from admin; Integrate Razorpay payments for Donate and Event Registration pages"
Write-Host "Pushing Main Promotional Page to GitHub..." -ForegroundColor Cyan
git push

# 2. Update Admin Repo (if df-admin has its own git repo)
if (Test-Path "df-admin\.git") {
    Write-Host "`n[2/2] Staging and committing df-admin repository..." -ForegroundColor Cyan
    Push-Location "df-admin"
    git add .
    git commit -m "Add Razorpay endpoints (/api/razorpay/create-order, verify-payment), expand site config API, and add Subdomains Control panel to Settings workspace"
    Write-Host "Pushing df-admin to GitHub..." -ForegroundColor Cyan
    git push
    Pop-Location
} else {
    Write-Host "`n[2/2] df-admin is included in the main repository commit." -ForegroundColor Green
}

Write-Host "`nSuccessfully updated changes to GitHub!" -ForegroundColor Green
