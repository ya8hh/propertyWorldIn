# Live inventory from Google Sheets

The public catalog is at `/inventory`. It reads a Google Sheet CSV feed on each visit, without a build-time cache. Changes to the sheet, including marking a listing on hold or sold, appear without redeploying the site. The property details and sitemap use the same feed.

## Connected sheet

The site is connected to the first tab (`gid=0`) of [Property World Inventory](https://docs.google.com/spreadsheets/d/1licQnyjd8UaXMPtkDSvAIhgFS1KZ_etqngPimKWRYyE/edit). If the team changes the tab or moves inventory to another sheet, set `INVENTORY_CSV_URL` to the new CSV export URL and deploy once.

Use [inventory-template.csv](inventory-template.csv) as a reference for columns A–M:

```csv
slug,title,area,locality,propertyType,purpose,status,size,bedrooms,summary,features,images,reel
```

**This shared workbook is readable by anyone with its link, including the raw CSV.** Keep prices, owner details, and internal notes in a separate private workbook, never in any tab of this shared file. The website ignores extra columns, but public access to the workbook could still reveal them.

Each row needs a unique URL-friendly `slug` (for example `sector-75-flat-101`), a title, locality, summary, and supported values:

- `area`: `noida`, `noida-extension`, `gaur-city`, `ghaziabad`
- `propertyType`: `flats`, `commercial`, `shops`, `plots`
- `purpose`: `Buy` or `Rent`
- `status`: `available`, `on-hold`, or `sold`

Only `available` rows with complete required fields appear publicly. `size`, `bedrooms`, `images`, and `reel` are optional. Separate multiple features or image links in one cell with `|`. For photos uploaded to Google Drive, set each file to **Anyone with the link → Viewer**, copy its individual file link, and paste the links into `images`, for example `https://drive.google.com/file/d/PHOTO_ID_1/view|https://drive.google.com/file/d/PHOTO_ID_2/view`. Direct HTTPS image URLs also work. The first photo becomes the card and main detail image; the rest appear in the detail gallery. An image embedded in a Sheets cell or an `=IMAGE()` formula does not export as a usable link in CSV, so paste URLs as text. If `images` is blank, the listing has no image area.

For a video, paste one public Instagram Reel URL (`https://www.instagram.com/reel/SHORTCODE/`) or Google Drive video file URL (`https://drive.google.com/file/d/VIDEO_ID/view`) into `reel`. Set Drive video sharing to **Anyone with the link → Viewer**. The video appears on the detail page only when a supported URL is present. Private, deleted, or restricted external files cannot play on the public site. Images placed in `public/images/listings/` are also supported, but adding new local files requires deployment.

Keep each slug stable so bookmarked listing URLs continue to work. Removing or closing a listing makes its detail page unavailable on the next visit.

The site does not read or show a price column. Visitors can filter by area, type, and buy/rent, then contact Property World about a specific listing.
