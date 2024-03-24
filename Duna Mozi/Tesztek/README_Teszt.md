# A backend Teszthez Imsomnia letöltése kell.
- Aztán nyomjon rá a "Use the local Scratch Pad" gombra.
- Balfelső sarokban talál egy " < Scratch Pad" legördülő fület, ahol a Import fülre kell kattintani.
- Majd válassza ki a Insomnia_2024-03-21_Backend_testing.json fálj-t, és a Scan gomb után leellenőrzi a fájlt, majd megint Import gombra nyomjon.
- Ahhoz hogy működjön a tesztelés, működnie kell az adatbázisnak, és az App.js node-dal el lett indítva.
- A teszteléseket manuálisan rá kell nyomni a Send gombra a középső részen felül.
- Ha kap 200-as vissza jelzést akkor sikeres a tesztelés, ha 404, akkor rossz a bemeneti változó és érték.
- Vannak olyan végpontok, ahol olyan adatokat kell használni, ami még nem járt le, vagy nem alapértelmezetten az adatbázisban van (pld.: filmekmódosítása egy valódi regisztrált film id-t kell felhasználó ha szeretné a lekérdezést működően használni).

# A Frontend Teszthez Cypress letöltése kell.
-Kiválasztjuk hogy milyen tesztet akarunk (Nelunk ez E2E)
-Kiválasztjuk a böngészöt
-Lefutatjuk a teszt fájlokat