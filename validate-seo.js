#!/usr/bin/env node

/**
 * SEO Validation Script for InsightSprint
 * Run with: npm run validate-seo
 */

import fs from "fs";

const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  bold: "\x1b[1m",
};

function log(message, color = "reset") {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`✓ ${description}`, "green");
    return true;
  } else {
    log(`✗ ${description} - MISSING`, "red");
    return false;
  }
}

function checkFileContent(filePath, searchString, description) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const found = content.includes(searchString);
    if (found) {
      log(`✓ ${description}`, "green");
      return true;
    } else {
      log(`✗ ${description} - NOT FOUND`, "red");
      return false;
    }
  } catch (error) {
    log(`✗ ${description} - ERROR: ${error.message}`, "red");
    return false;
  }
}

function main() {
  log("\n=== InsightSprint SEO Validation ===\n", "bold");

  let passed = 0;
  let failed = 0;

  // Check core files
  log("Checking Core Files:", "blue");
  if (checkFile("index.html", "index.html exists")) passed++;
  else failed++;
  if (checkFile("public/robots.txt", "robots.txt exists")) passed++;
  else failed++;
  if (checkFile("public/sitemap.xml", "sitemap.xml exists")) passed++;
  else failed++;
  if (checkFile("public/manifest.json", "manifest.json exists")) passed++;
  else failed++;
  if (checkFile("public/404.html", "404.html exists")) passed++;
  else failed++;

  // Check meta tags in index.html
  log("\nChecking Meta Tags:", "blue");
  if (
    checkFileContent(
      "index.html",
      '<meta name="description"',
      "Meta description present",
    )
  )
    passed++;
  else failed++;
  if (
    checkFileContent(
      "index.html",
      '<meta name="keywords"',
      "Meta keywords present",
    )
  )
    passed++;
  else failed++;
  if (
    checkFileContent(
      "index.html",
      'property="og:title"',
      "Open Graph title present",
    )
  )
    passed++;
  else failed++;
  if (
    checkFileContent(
      "index.html",
      'property="og:image"',
      "Open Graph image present",
    )
  )
    passed++;
  else failed++;
  if (
    checkFileContent(
      "index.html",
      'property="twitter:card"',
      "Twitter Card present",
    )
  )
    passed++;
  else failed++;
  if (
    checkFileContent(
      "index.html",
      "application/ld+json",
      "Structured data present",
    )
  )
    passed++;
  else failed++;
  if (
    checkFileContent("index.html", 'rel="canonical"', "Canonical URL present")
  )
    passed++;
  else failed++;

  // Check for placeholder URLs that need updating
  log("\nChecking for Placeholder URLs:", "blue");
  const hasPlaceholder = checkFileContent(
    "index.html",
    "insightsprint.vercel.app",
    "Placeholder URL found (needs updating)",
  );
  if (hasPlaceholder) {
    log("  ⚠ Update URLs to your actual domain before launch", "yellow");
    failed++;
  } else {
    log("✓ URLs updated to production domain", "green");
    passed++;
  }

  // Check for required images
  log("\nChecking Required Images:", "blue");
  const images = [
    ["public/og-image.png", "Social media image (og-image.png)"],
    ["public/favicon.svg", "Favicon (favicon.svg)"],
    ["public/apple-touch-icon.png", "Apple touch icon"],
    ["public/icon-192.png", "PWA icon 192px"],
    ["public/icon-512.png", "PWA icon 512px"],
  ];

  images.forEach(([path, desc]) => {
    if (checkFile(path, desc)) passed++;
    else failed++;
  });

  // Check package.json
  log("\nChecking package.json:", "blue");
  if (
    checkFileContent(
      "package.json",
      '"name": "insightsprint"',
      "Package name updated",
    )
  )
    passed++;
  else failed++;
  if (checkFileContent("package.json", '"description":', "Description present"))
    passed++;
  else failed++;
  if (checkFileContent("package.json", '"keywords":', "Keywords present"))
    passed++;
  else failed++;

  // Summary
  log("\n=== Summary ===", "bold");
  log(`Passed: ${passed}`, "green");
  log(`Failed: ${failed}`, "red");

  const total = passed + failed;
  const percentage = Math.round((passed / total) * 100);

  log(`\nSEO Readiness: ${percentage}%`, percentage >= 80 ? "green" : "yellow");

  if (percentage < 100) {
    log("\n⚠ Action Required:", "yellow");
    log("1. Create missing images in /public folder", "yellow");
    log("2. Update placeholder URLs to your domain", "yellow");
    log("3. Run this script again to verify", "yellow");
    log("\nSee SEO-CHECKLIST.md for detailed steps", "blue");
  } else {
    log("\n✓ All checks passed! Ready for launch 🚀", "green");
  }

  log("");
  process.exit(failed > 0 ? 1 : 0);
}

main();
