# Ylläpito ja palautus

## Sivuston toimintamalli
Staattinen HTML/CSS/JavaScript. Kaksi etusivua ja kaksi varauspalvelun valintasivua:
- FI: `/`, `/book/`
- EN: `/en/`, `/en/book/`

Seitsemän aitoa huoneistokuvaa `images/`-kansiossa. Varaus tapahtuu ulkoisesti Airbnbssä tai Booking.comissa. Google Maps -kartta latautuu vasta käyttäjän toiminnolla.

## Tiedostot
Yhdistetyt tuotantoassetit:
- `site.bundle.css` — kuuden CSS-tiedoston kaskadi alkuperäisessä järjestyksessä + pieni kontrastikorjaus.
- `site-main.bundle.js` — etusivujen JavaScript.
- `site-book.bundle.js` — varaussivujen JavaScript.

Alkuperäiset CSS/JS-lähdetiedostot jätetty `current/`-kansioon lähteiksi, mutta HTML käyttää vain bundleja. Tätä kannattaa jatkossa hallita versionhallinnalla eikä lisätä uusia päällekkäisiä hotfix-tiedostoja.

## Päivitysmenettely
1. Tee pieni muutos tiedostoon ja tarkista vaikutus molemmissa kielissä.
2. Testaa desktop- ja mobiilinäyttö, 320–1440 px.
3. Tarkista galleria, kartta, varauslinkit, kielenvaihto ja focus/Escape.
4. Julkaise ensin Preview, sitten Production vasta onnistuneiden testien jälkeen.
5. Merkitse uusi deployment-tunniste ylläpitolokiin.

## Palautus
Nopein tapa palauttaa julkaistu versio on Vercel-projektin deploymentista tehtävä Redeploy. Palauta viimeinen toimiva versio, älä muokkaa verkkotunnusten DNS-tietueita ongelman ratkaisemiseksi, ellei ongelma todetusti johdu niistä.

Täysi riippumaton lähdekoodipalautus onnistuu tämän GitHub-haaran `current/`-kansion tiedostoista. Kaikki käytössä olevat CSS-, JS-, HTML- ja kuvatiedostot ovat mukana.

## Ulkoiset riippuvuudet
- Google Fonts (DM Sans, Playfair Display) verkon kautta
- Google Maps upotetaan vasta suostumusta ilmaisevan avaustoiminnon jälkeen
- Airbnb ja Booking.com ulkoiset varausalustat
- Vercel hosting

Ei varausten synkronointia, kirjautumista, maksunkäsittelyä tai tietokantaa.
