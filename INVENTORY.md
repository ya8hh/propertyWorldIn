# Live inventory from Google Sheets

The public catalog is at `/inventory`. It reads a Google Sheet CSV feed on each visit, without a build-time cache. Changes to the sheet, including marking a listing on hold or sold, appear without redeploying the site. The property details and sitemap use the same feed.

## Connected sheet

The site is connected to the first tab (`gid=0`) of [Property World Inventory](https://docs.google.com/spreadsheets/d/1licQnyjd8UaXMPtkDSvAIhgFS1KZ_etqngPimKWRYyE/edit). Its public CSV export was verified accessible, but the sheet was blank when connected. The site therefore shows a contact invitation until your team adds the header and listings. If the team changes the tab or moves inventory to another sheet, set `INVENTORY_CSV_URL` to the new CSV export URL and deploy once.

Import [inventory-template.csv](inventory-template.csv) into the blank sheet (File → Import → Upload) so these headers occupy columns A–L:

```csv
slug,title,area,locality,propertyType,purpose,status,size,bedrooms,summary,features,images
```

**This shared workbook is readable by anyone with its link, including the raw CSV.** Keep prices, owner details, and internal notes in a separate private workbook, never in any tab of this shared file. The website ignores extra columns, but public access to the workbook could still reveal them.

Each row needs a unique URL-friendly `slug` (for example `sector-75-flat-101`), a title, locality, summary, and supported values:

- `area`: `noida`, `noida-extension`, `gaur-city`, `ghaziabad`
- `propertyType`: `flats`, `commercial`, `shops`, `plots`
- `purpose`: `Buy` or `Rent`
- `status`: `available`, `on-hold`, or `sold`

Only `available` rows with complete required fields appear publicly. `size` and `bedrooms` are optional. Separate multiple features or image URLs with `|`. Use HTTPS image URLs for photos managed online; that lets the team change photos in the sheet without redeploying. Images placed in `public/images/listings/` are also supported, but adding new local files does require deployment. Keep each slug stable so bookmarked listing URLs continue to work. Removing or closing a listing makes its detail page unavailable on the next visit.

The site does not read or show a price column. Visitors can filter by area, type, and buy/rent, then contact Property World about a specific listing. Until the sheet URL is connected, visitors see a contact invitation instead of unverified listings.
