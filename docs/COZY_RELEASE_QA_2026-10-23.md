# Cozy Studio Punavuori — julkaisun QA ja luovutus

Päivitetty 23.10.2026. Ensisijainen osoite: https://www.cozy-studio-punavuori.fi/

## 1. Automaattinen tekninen tarkistus

Aja projektin juuressa Node 20+:lla:

```bash
node scripts/qa-cozy-site.mjs
```

Previewlle: `BASE_URL=https://<preview-host> node scripts/qa-cozy-site.mjs`.

Testi tarkistaa FI/EN-etusivut ja varaussivut, galleriatermistöt, aria-labelit,
verkkosivujen vastauskoodit, 7 kuvan lataukset, Airbnb- ja Booking-kohdeosoitteet,
hakukoneiden sallimisen, sivukartan sekä tuotannon apex → www -ohjauksen.

**Rajoitus:** Pelkkä linkin näkyminen HTML:ssä ei todista, että Airbnb tai Booking
avaa ilmoituksen käyttäjän oikeassa selaimessa. Se ei myöskään todista mobiililayoutia.

## 2. Manuaalinen mobiili-QA (julkaisun luovutusehto)

Testaa iPhone/Safari (esim. 390px) sekä Android/Chrome (esim. 360px)
ja toista tärkeimmät toiminnot 320px leveydellä:

- [ ] Ylä- ja alapalkit eivät peitä sisältöä eikä sivulla ole vaakavieritystä.
- [ ] Kielenvaihto FI ↔ EN säilyttää oikean sivupolun.
- [ ] Kuvagalleria: ruudukko ja interaktiivinen näkymä avautuvat; valokuvat vaihtuvat.
- [ ] Kuvan suurennus aukeaa ja sulkeutuu sekä kosketuksella että Esc-näppäimellä, kun näppäimistö on käytettävissä.
- [ ] Varaus-CTA avaa oikeankielisen varaussivun.
- [ ] Airbnb-linkki avaa kohteen `1386922799666367407` oikeassa palvelussa.
- [ ] Booking-linkki avaa `cozy-studio-in-punavuori-helsinki1`-kohteen.
- [ ] Kaikki seitsemän oikean huoneiston kuvaa toimivat.
- [ ] Osoitteissa on HTTPS eikä kriittisiä JavaScript-konsolivirheitä.

Merkitse kunkin testin laite, selain, päivämäärä, tulos ja mahdollinen
kuvakaappaus. Avoin kohta on **EI TESTATTU**, ei PASS.

## 3. Kirsin sisällön lopullinen hyväksyntä

- [ ] Julkinen kohdeosoite ja varustelu vastaavat asuntoa.
- [ ] Kuvat vastaavat nykyistä kalustusta ja käyttölupa on olemassa.
- [ ] Saapumis- ja lähtöajat vastaavat Airbnb-/Booking-ilmoituksia.
- [ ] Varauslinkit osoittavat oikeaan asuntoon.
- [ ] Mahdolliset arviot tai väittämät on tarkistettu.
- [ ] Ei ovikoodeja eikä yksityisiä sisäänpääsytietoja julkisesti.
- [ ] Kirsi hyväksynyt julkaistavan sisällön kirjallisesti.

## 4. Luovutus ja ylläpito

- [ ] Tuotannon toiminta tarkistettu viimeisen deployn jälkeen.
- [ ] GitHubin lähdemaster (current/) ja toimiva Vercel-deployment kirjattu.
- [ ] 12 kk ylläpitokauden alkupäivä vahvistettu ja loppupäivä kalenterissa.
- [ ] Verkkotunnuksen rekisteröijä, maksaja ja uusimispäivä vahvistettu.
- [ ] Hanna vastaa tavanomaisista sisältömuutoksista sovitun 300 € + ALV -palvelun rajoissa.
- [ ] Kirsi tietää kenelle muutospyynnöt lähetetään.
- [ ] Luovutusviesti lähetetty vasta kaikkien P0-tarkistusten jälkeen.

Ei muuta Airbnb-/Booking-hintoja eikä kalentereita ilman Kirsin hyväksyntää.
