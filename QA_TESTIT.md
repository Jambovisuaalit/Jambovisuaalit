# Julkaisu- ja QA-testit 20.10.2026

## Tulos
Uusi tuotanto: `dpl_3qpnhJmpa3TeXVAsvzFBcNC5dAjU`, READY.
Neljä sivua vastasi HTTP 200, samoin kolme yhdistettyä CSS/JS-tiedostoa ja sitemap.xml.

Preview-testauksessa 16/16 sivu-leveys-yhdistelmää läpäisty (320, 390, 768, 1440 px; FI/EN etusivu + FI/EN varaus). Ei vaakaylivuotoa, yksi H1/sivu, varauslinkit kunnossa.
3D-galleriassa 7 korttia, lightbox aukeaa ja sulkeutuu Escape-painikkeella, Google Maps avautuu.
JavaScript-ajonaikaisia virheitä ei havaittu.

Alkuperäisen ja yhdistetyn CSS/JS-version vertailussa sivuosioiden geometria täsmäsi 16/16 näytössä. Vercelin tarpeettomia feedback-skriptejä poistettu, FI/EN sisällöt säilytetty.

Kontrastiskannauksessa gallerian laskuriteksti jäi aluksi 4.15:1, korjattiin #5e6b61-sävyyn (laskettu 4.61:1). Kuvatekstit ovat valkoisia kuvaelementin liukuvärivarjostuksen päällä, jota yksinkertainen kontrastiskannaus ei osaa arvioida luotettavasti.

Browser-tason mittauksia tehty 390 ja 1440 px leveydellä. Mittauksissa kaikki aktiiviset kuvat latautuivat; joissakin pienissä linkeissä kosketuspinta jäi alle 24 px korkeaksi. Tämä on P2-saavutettavuuskehityskohde.

**Lighthouse-pisteitä ei raportoida:** Google PageSpeed Insights palautti 429-kiintiövirheen. Fyysisen iPhone/Safari-laitteen tarkistusta ei ole tehty. Kattavaa WCAG-vaatimustenmukaisuutta ei sertifioitu.

Julkinen sivusto avattu indeksoitavaksi osoitteessa https://www.cozy-studio-punavuori.fi; tämä ei takaa Googlen indeksointia.
