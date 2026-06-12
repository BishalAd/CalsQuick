<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex,nofollow"/>
        <title>Sitemap — CalcQuick</title>
        <style>
          /* ── Reset ── */
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          /* ── Tokens ── */
          :root {
            --ink:         #0f0f12;
            --body:        #4b5563;
            --muted:       #9ca3af;
            --canvas:      #ffffff;
            --soft:        #f8f9fb;
            --hairline:    #e5e7eb;
            --accent:      #6c47ff;
            --accent-soft: #ede9fe;
            --green:       #10b981;
            --amber:       #f59e0b;
            --red:         #ef4444;
            --radius:      10px;
            --shadow:      0 1px 3px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.06);
          }

          /* ── Base ── */
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--soft);
            color: var(--ink);
            line-height: 1.6;
            min-height: 100vh;
          }

          /* ── Header ── */
          .site-header {
            background: var(--canvas);
            border-bottom: 1px solid var(--hairline);
            padding: 0 24px;
          }
          .header-inner {
            max-width: 1100px;
            margin: 0 auto;
            height: 60px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo-mark {
            width: 32px; height: 32px;
            background: var(--accent);
            border-radius: 8px;
            display: flex; align-items: center; justify-content: center;
            font-size: 16px;
          }
          .logo-text {
            font-size: 17px;
            font-weight: 700;
            letter-spacing: -0.4px;
            color: var(--ink);
          }
          .logo-text span { color: var(--accent); }

          /* ── Main ── */
          main { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }

          /* ── Hero ── */
          .hero { margin-bottom: 36px; }
          .hero h1 {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.6px;
            color: var(--ink);
          }
          .hero p { margin-top: 6px; font-size: 15px; color: var(--body); }

          /* ── Stats strip ── */
          .stats {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 32px;
          }
          .stat-chip {
            background: var(--canvas);
            border: 1px solid var(--hairline);
            border-radius: 100px;
            padding: 6px 16px;
            font-size: 13px;
            color: var(--body);
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .stat-chip b { color: var(--ink); }

          /* ── Search ── */
          .search-wrap { margin-bottom: 20px; }
          #url-filter {
            width: 100%;
            max-width: 420px;
            height: 40px;
            padding: 0 14px;
            border: 1px solid var(--hairline);
            border-radius: var(--radius);
            background: var(--canvas);
            font-size: 14px;
            color: var(--ink);
            outline: none;
            transition: border-color .15s;
          }
          #url-filter:focus { border-color: var(--accent); }

          /* ── Table ── */
          .table-wrap {
            background: var(--canvas);
            border: 1px solid var(--hairline);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            overflow: hidden;
          }
          table { width: 100%; border-collapse: collapse; }
          thead tr {
            background: var(--soft);
            border-bottom: 1px solid var(--hairline);
          }
          th {
            padding: 12px 16px;
            text-align: left;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .06em;
            color: var(--muted);
            white-space: nowrap;
          }
          tbody tr {
            border-bottom: 1px solid var(--hairline);
            transition: background .12s;
          }
          tbody tr:last-child { border-bottom: none; }
          tbody tr:hover { background: #f5f3ff; }
          td { padding: 13px 16px; font-size: 14px; vertical-align: middle; }

          /* URL cell */
          .url-cell a {
            color: var(--accent);
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          .url-cell a:hover { text-decoration: underline; }

          /* Priority badge */
          .priority-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px; height: 24px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 700;
            font-variant-numeric: tabular-nums;
          }
          .p-high   { background: #dcfce7; color: #15803d; }
          .p-med    { background: #fef9c3; color: #a16207; }
          .p-low    { background: #fee2e2; color: #b91c1c; }

          /* Priority bar */
          .priority-bar-wrap { display: flex; align-items: center; gap: 8px; }
          .priority-bar {
            flex: 1;
            height: 5px;
            background: var(--hairline);
            border-radius: 99px;
            overflow: hidden;
            max-width: 80px;
          }
          .priority-bar-fill {
            height: 100%;
            border-radius: 99px;
          }

          /* Freq badge */
          .freq-badge {
            display: inline-block;
            padding: 3px 9px;
            border-radius: 100px;
            font-size: 11px;
            font-weight: 600;
            text-transform: capitalize;
            border: 1px solid var(--hairline);
            color: var(--body);
            background: var(--soft);
          }

          /* Date */
          .date-cell { color: var(--body); font-variant-numeric: tabular-nums; white-space: nowrap; }

          /* ── Footer ── */
          .page-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: var(--muted);
          }
          .page-footer a { color: var(--muted); text-decoration: underline; }

          /* ── No-results ── */
          .no-results { padding: 48px; text-align: center; color: var(--muted); font-size: 14px; display: none; }

          /* ── Responsive ── */
          @media (max-width: 640px) {
            .col-freq, .col-lastmod { display: none; }
            main { padding: 24px 16px 60px; }
          }
        </style>
      </head>
      <body>

        <!-- Header -->
        <header class="site-header">
          <div class="header-inner">
            <div class="logo-mark">🧮</div>
            <div class="logo-text">Calc<span>Quick</span></div>
          </div>
        </header>

        <main>
          <!-- Hero -->
          <div class="hero">
            <h1>XML Sitemap</h1>
            <p>
              This sitemap lists all publicly indexed pages on
              <a href="https://calcquick.online" style="color:var(--accent);text-decoration:none;">calcquick.online</a>.
              Submit it to
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;">Google Search Console</a>
              and
              <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener" style="color:var(--accent);text-decoration:none;">Bing Webmaster Tools</a>
              for faster indexing.
            </p>
          </div>

          <!-- Stats -->
          <div class="stats">
            <div class="stat-chip">
              📄 <b><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></b> URLs indexed
            </div>
            <div class="stat-chip">
              🔄 Last generated: <b><xsl:value-of select="substring(sitemap:urlset/sitemap:url[1]/sitemap:lastmod, 1, 10)"/></b>
            </div>
            <div class="stat-chip">
              ✅ Schema: <b>sitemaps.org/0.9</b>
            </div>
          </div>

          <!-- Search -->
          <div class="search-wrap">
            <input
              id="url-filter"
              type="search"
              placeholder="🔍  Filter URLs…"
              oninput="filterTable(this.value)"
              autocomplete="off"
            />
          </div>

          <!-- Table -->
          <div class="table-wrap">
            <table id="sitemap-table">
              <thead>
                <tr>
                  <th style="width:50%">URL</th>
                  <th class="col-lastmod">Last Modified</th>
                  <th class="col-freq">Change Freq</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:priority" data-type="number" order="descending"/>
                  <tr>
                    <!-- URL -->
                    <td class="url-cell">
                      <a href="{sitemap:loc}" target="_blank" rel="noopener">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>

                    <!-- Last modified -->
                    <td class="date-cell col-lastmod">
                      <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                    </td>

                    <!-- Change frequency -->
                    <td class="col-freq">
                      <span class="freq-badge">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>

                    <!-- Priority bar + badge -->
                    <td>
                      <div class="priority-bar-wrap">
                        <xsl:choose>
                          <xsl:when test="sitemap:priority >= 0.9">
                            <span class="priority-badge p-high"><xsl:value-of select="sitemap:priority"/></span>
                            <div class="priority-bar"><div class="priority-bar-fill" style="width:{sitemap:priority * 100}%;background:#22c55e;"/></div>
                          </xsl:when>
                          <xsl:when test="sitemap:priority >= 0.5">
                            <span class="priority-badge p-med"><xsl:value-of select="sitemap:priority"/></span>
                            <div class="priority-bar"><div class="priority-bar-fill" style="width:{sitemap:priority * 100}%;background:#eab308;"/></div>
                          </xsl:when>
                          <xsl:otherwise>
                            <span class="priority-badge p-low"><xsl:value-of select="sitemap:priority"/></span>
                            <div class="priority-bar"><div class="priority-bar-fill" style="width:{sitemap:priority * 100}%;background:#f87171;"/></div>
                          </xsl:otherwise>
                        </xsl:choose>
                      </div>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
            <div class="no-results" id="no-results">No URLs match your filter.</div>
          </div>

          <!-- Footer -->
          <div class="page-footer">
            <p>
              Generated by <a href="https://calcquick.online">CalcQuick</a> ·
              <a href="https://www.sitemaps.org/protocol.html" target="_blank" rel="noopener">Sitemap Protocol 0.9</a>
            </p>
          </div>
        </main>

        <script>
          function filterTable(q) {
            const rows = document.querySelectorAll('#sitemap-table tbody tr');
            const noResults = document.getElementById('no-results');
            let visible = 0;
            rows.forEach(function(row) {
              const url = row.querySelector('.url-cell').textContent.toLowerCase();
              if (url.includes(q.toLowerCase())) {
                row.style.display = '';
                visible++;
              } else {
                row.style.display = 'none';
              }
            });
            noResults.style.display = visible === 0 ? 'block' : 'none';
          }
        </script>

      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
