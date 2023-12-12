-- Active: 1697197686851@@127.0.0.1@3306@DunaMozi
-- MySQL Script generated by MySQL Workbench
-- Tue Dec 12 12:00:35 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DunaMozi
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DunaMozi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DunaMozi` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci ;
USE `DunaMozi` ;

-- -----------------------------------------------------
-- Table `DunaMozi`.`alkalmazott`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DunaMozi`.`alkalmazott` (
  `idalkalmazott` INT NOT NULL AUTO_INCREMENT,
  `alkalmazottNev` VARCHAR(200) NULL,
  `jelszo` BLOB(100) NULL,
  `email` VARCHAR(200) NULL,
  `admin` INT NULL,
  `token` TEXT NULL,
  PRIMARY KEY (`idalkalmazott`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DunaMozi`.`kategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DunaMozi`.`kategoria` (
  `KategoriaId` INT NOT NULL AUTO_INCREMENT,
  `kategoriNev` VARCHAR(100) NULL,
  PRIMARY KEY (`KategoriaId`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DunaMozi`.`filmek`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DunaMozi`.`filmek` (
  `idfilmek` INT NOT NULL AUTO_INCREMENT,
  `filmnev` VARCHAR(200) NULL,
  `filmdescription` LONGTEXT NULL,
  `filmhossz` VARCHAR(10) NULL,
  `filmkorhatár` INT NULL,
  `film_KategoriaId` INT NOT NULL,
  PRIMARY KEY (`idfilmek`),
  INDEX `fk_filmek_kategoria1_idx` (`film_KategoriaId` ASC) VISIBLE,
  CONSTRAINT `fk_filmek_kategoria1`
    FOREIGN KEY (`film_KategoriaId`)
    REFERENCES `DunaMozi`.`kategoria` (`KategoriaId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DunaMozi`.`VetitoTerem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DunaMozi`.`VetitoTerem` (
  `idVetitoTerem` INT NOT NULL AUTO_INCREMENT,
  `Terem` VARCHAR(255) NULL,
  PRIMARY KEY (`idVetitoTerem`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DunaMozi`.`Vetitesek`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DunaMozi`.`Vetitesek` (
  `idVetitesek` INT NOT NULL AUTO_INCREMENT,
  `vetitesidopont` DATETIME NULL,
  `VetitesHelyID` INT NULL,
  `VetitesFilmID` INT NULL,
  `SzabadJegyek` INT(50) NULL,
  `VetitoTerem_idVetitoTerem` INT NOT NULL,
  `filmek_idfilmek` INT NOT NULL,
  PRIMARY KEY (`idVetitesek`),
  INDEX `fk_Vetitesek_VetitoTerem1_idx` (`VetitoTerem_idVetitoTerem` ASC) VISIBLE,
  INDEX `fk_Vetitesek_filmek1_idx` (`filmek_idfilmek` ASC) VISIBLE,
  CONSTRAINT `fk_Vetitesek_VetitoTerem1`
    FOREIGN KEY (`VetitoTerem_idVetitoTerem`)
    REFERENCES `DunaMozi`.`VetitoTerem` (`idVetitoTerem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Vetitesek_filmek1`
    FOREIGN KEY (`filmek_idfilmek`)
    REFERENCES `DunaMozi`.`filmek` (`idfilmek`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DunaMozi`.`ülések`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DunaMozi`.`ülések` (
  `ules_id` INT NOT NULL AUTO_INCREMENT,
  `VetitoTerem_idVetitoTerem` INT NOT NULL,
  `sor` VARCHAR(1) NULL,
  `szekszam` INT NULL,
  `foglalt` TINYINT NULL,
  PRIMARY KEY (`ules_id`),
  INDEX `fk_ülések_VetitoTerem1_idx` (`VetitoTerem_idVetitoTerem` ASC) VISIBLE,
  CONSTRAINT `fk_ülések_VetitoTerem1`
    FOREIGN KEY (`VetitoTerem_idVetitoTerem`)
    REFERENCES `DunaMozi`.`VetitoTerem` (`idVetitoTerem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO kategoria VALUES (NULL,"Akció"),(NULL,"Animációs"),(NULL,"Autóversenyzős"),(NULL,"Áldokumentumfilmek"),(NULL,"Börtönfilmek"),(NULL,"Bünügyi"),(NULL,"Családi"),(NULL,"Dokumentumfilmek"),(NULL,"Életrajzi"),(NULL,"Fantasi"),(NULL,"Filmdráma"),(NULL,"Filmszatíra"),(NULL,"Harcmüvészeti"),(NULL,"Háborus"),(NULL,"Horror"),(NULL,"Kaland"),(NULL,"Kalózos"),(NULL,"Kémfilmek"),(NULL,"Musical"),(NULL,"Romantikus"),(NULL,"Sci-Fi"),(NULL,"Thriller"),(NULL,"Történelmi"),(NULL,"Vígjáték"),(NULL,"Western");
INSERT INTO `VetitoTerem` VALUES (NULL,"1-es terem"),(NULL,"2-es terem"),(NULL,"3-mas terem"),(NULL,"4-es terem");
INSERT INTO `filmek` VALUES
(NULL, "Star Trek I", "Két és fél év telt el azóta, hogy Kirk befejezte ötéves parancsnoki szolgálatát a USS Enterprise-on. Az Enterprise-t felújították, és James T. Kirköt előléptették admirálissá, így ő a Csillagflotta egyik parancsnoka. Egy masszív energiafelhő formájában megjelenő idegen erőt érzékelnek klingon felségterületen, amely a Föld felé halad. A felhő útja során elpusztít három klingon hajót, és a föderáció Epszilon-9 megfigyelő űrállomását. A flottaparancsnokság úgy dönt, az Enterprise-t bízza meg azzal, hogy kapcsolatba lépjen a jelenséggel.","132 perc",12,21),
(NULL,"Star Trek II","Mindeközben a USS Reliant (NCC-1864) Miranda osztályú kutatóhajó a Genezis projekt végcéljául szolgáló bolygót, a Ceti Alpha VI-ot kutatja, dr. Carol Marcus utasítására. A projekt célja: M típusú, lakható bolygót teremteni akármilyen lakhatatlan planétából. A bolygó átvizsgálása közben Terrell kapitány és társa, az Enterprise korábbi biztonsági főnöke, Chekov első tiszt egy űrhajó roncsait találja meg, a Botany Bay az. Chekov felismeri a roncsokat, s menekülnének, ám Khan és Augmentjei elfogják őt és Terrell kapitányt. Khan elmagyarázza, hogy a bolygó, melyen tartózkodnak a Ceti Alpha V, élővilágát azonban elpusztította a szomszédos Ceti Alpha VI bolygó felrobbanása. Khan és emberei csak nagy nehézségek árán maradtak életben a bolygón. Khan rájön, hogy Chekovék összetévesztették a bolygókat, ezért érdekli, hogy miért jöttek ide, de mivel vonakodnak válaszolni, egy parazitával manipulálja áldozatai agyát, így megtudja, hogy Terrell és Chekov miért vannak a bolygón."," 113 perc",12,21),
(NULL,"Star Trek III","Mindeközben Kirk fia, David Marcus és Saavik hadnagy a USS Grissom nevű kutatóhajón tartózkodnak, és a Genesis bolygót tanulmányozzák, ami a második film végén keletkezett. Ők ketten lesugároznak a bolygó felszínére, hogy a terraformáció stádiumát tanulmányozzák. A bolygón töltött idő alatt felfedezik, hogy Spock teste újjászületett a Genesis effektus hatására, habár emlékei nincsenek, és egy gyermek testi és szellemi szintjén van. Marcus, Saavik unszolására elismeri, hogy instabil proto-anyagot alkalmazott a Genesis készülék építése közben, hogy így áthidaljon néhány problémát. Enélkül ugyanis a Genesis folyamat évekbe tellett volna, vagy egyáltalán le sem játszódott volna.","105 perc",12,21),
(NULL,"Star Trek IV","Egy óriási idegen szonda érkezik a Földhöz, és különlegesen erős jeleket sugároz a planétára, melynek következtében elszívja a közelben lévő hajók energiáját, és felforralja a tengereket. James T. Kirk admirális és csapata éppen Spockért megy a Vulcanra, amikor értesülnek a flottától a Földnél kialakult helyzetről. Kirk tudja, hogy a flotta nem fogja örömmel fogadni, hiszen a USS Enterprise megsemmisült, ezért az előző kalandból zsákmányolt klingon hajóval indulnak a Föld felé.","119 perc",12,21),
(NULL,"Star Trek V","A Star Trek IV: A hazatérésben történtek után az Enterprise legénysége megérdemelt pihenését tölti, miközben az űrhajót éppen javítják. James T. Kirk Yosemite-nél pihen, de közben két igazi kihívást is teljesíteni akar: megmászni a Kapitány-csúcsot, és megtanítani Spockot tábori dalokra. Szerencsétlenségükre a pihenésük hamar véget ér, amikor a legénységet a távoli Nimbus III-hoz vezénylik túszmentés céljából.","107 perc",12,21),
(NULL,"Star Trek VI","Nyugtalanság keríti hatalmába a klingon anyabolygó, Qo'nos (a Kronosz) lakosait, miután a Praxis nevű holdjuk felrobban. A hold kulcsfontosságú volt az energia előállítása szempontjából, ráadásul a robbanás beszennyezte a Kronoszt is. Az előrejelzések szerint ez 50 évre tönkretette a légkört. Mivel a planéta már nem képes elegendő oxigénnel ellátni a lakosságot, a Klingon Birodalom úgy dönt, hogy békét köt a Föderációval. A Csillagflotta a USS Enterprise-t küldi, hogy vegyék fel a kapcsolatot Gorkon kancellárral, és kísérjék a Földre. Ez az ötlet nem tetszik James T. Kirk kapitánynak, hiszen fiát egy klingon ölte meg.","113 perc",12,21),
(NULL,"Star Trek VII"," James T. Kirk és Montgomery Scott kapitányok, továbbá Pavel Andrejevics Csekov parancsnok részt vesznek a következő csillaghajó, a USS Enterprise-B ünnepélyes megkeresztelésén, de ez tragédiával végződik. 78 évvel később vagyunk, a USS Enterprise-D fedélzetén. Worf-ot előléptetik parancsnokhelyettessé, a legénység a holofedélzeten ünnepli, eközben Jean-Luc Picard kapitány szomorú híreket kap otthonról. Az Enterprise később vészjelzéseket fog az Amargosa nevű csillagnál keringő űrállomásról. A megérkezéskor az űrállomás teljesen elhagyatottnak tűnik megtámadták a romulánok, akik a tőlük ellopott trilítiumot keresték. Worf parancsnokhelyettes egy túlélőt talál: Sorant, akivel visszatér az Enterprise fedélzetére. Soran biztosítja Picard-t, hogy jól van, de sürgősen vissza kell térnie az űrállomásra, hogy befejezhesse a kísérletét. Picard ebbe beleegyezik, de azt mondja, csak akkor térhet vissza, ha előbb az állomást tüzetesen átvizsgálták.","118 perc",12,21),
(NULL,"Star Trek VIII","A USS Enterprise-D megsemmisülése után a hajó legénységét, Worf kivételével, áthelyezik az újonnan épített Sovereign osztályú csillaghajóra, a USS Enterprise-E-re.A film elején egy Borg kockahajó belép a föderációs űrbe és a Föld felé veszi az irányt. A közelgő veszély ellenére a Csillagflotta parancsnoksága úgy dönt, hogy a legfejlettebb hajójukat, az Enterprise-t nem a Földhöz vezénylik, a bolygó védelmére, hanem a Romulán semleges zónához küldik járőrözni, nehogy a Romulánok kihasználják a tökéletes alkalmat egy, a Föderáció elleni támadásra.","111 perc",12,21),
(NULL,"Star Trek IX","Egy diplomáciai küldetés során a USS Enterprise értesül arról, hogy Data parancsnokhelyettes megvadult egy megfigyelési küldetés során a Ba’ku bolygón.","103 perc",12,21),
(NULL,"Star Trek X","Miközben a USS Enterprise-E legénysége a frissen összeházasodott William T. Rikernak és Deanna Troinak búcsú estéjét tartják, különös jeleket fognak a Romulán Semleges Zónához közel eső Kolarus III nevű bolygóról, ahol is találnak egy Data parancsnokhelyetteshez hasonlító android darabjait.","116 perc",12,21),
(NULL,"Star Trek XI","2233-ban a USS Kelvin föderációs csillaghajó egy különös kozmikus jelenség kivizsgálását kezdi meg. Ekkor váratlanul egy hatalmas és félelmetes, polipszerű űrhajó bukkan elő egy szingularitásból, amihez képest a föderáció helyszínen lévő járműje teljesen eltörpül.","127 perc",12,21),
(NULL,"Star Trek XII","Az USS Enterprise-t a Nibiru bolygóra küldik, hogy megfigyeljenek egy űrutazás előtti civilizációt. Kirk és Spock megpróbálják megmenteni a lakosokat egy közelgő vulkánkitöréstől, amely mindannyiukat megölhetné. Amikor Spock élete veszélybe kerül, James T. Kirk kapitány megszegi az Elsődleges irányelvet, és a helyiek meglátják a Spock megmentésére igyekvő Enterprise-t. Miután visszahívják őket a Földre, Kirköt elsőtisztté fokozzák le, míg Christopher Pike admirális visszaveszi az Enterprise parancsnokságát.","133 perc",12,21),
(NULL,"Star Trek XIII","Az USS Enterprise-t ötéves útja felénél egy diplomáciai küldetést teljesít; nem sok sikerrel. Az Abronath ereklye végül az ő kezükben marad. Így térnek Yorktownba, a Föderáció legújabb és legnagyobb mesterséges bolygójára.","125 perc",12,21);