# SAP BTP CUSTOM AUTH

- **Autore:** StormMX  
- **Versione:** 1.0   

## Descrizione

Questo progetto fornisce un middleware per autenticare le richieste HTTP in un'applicazione SAP CAP (Express,js) utilizzando Passport e la strategia JWT specifica per il servizio SAP XSUAA. Il middleware controlla il token JWT presente nella richiesta, verificandone la validità e, in caso di successo, consente l'accesso alle risorse protette.

## Requisiti

- **Node.js** (versione consigliata: 12 o superiore)
- **npm** o un altro gestore di pacchetti per Node.js

I seguenti moduli devono essere installati:

- [`passport`](http://www.passportjs.org/)
- [`@sap/xsenv`](https://www.npmjs.com/package/@sap/xsenv)
- [`@sap/xssec`](https://www.npmjs.com/package/@sap/xssec)

## Funzionamento

Il modulo configura Passport per utilizzare la strategia JWT fornita dal pacchetto `@sap/xssec` insieme alle credenziali del servizio XSUAA caricate tramite `@sap/xsenv`. Viene esportato un middleware (`authenticateJWT`) che:

1. Autentica il token JWT presente nella richiesta.
2. Se l'autenticazione fallisce, restituisce un errore 401 ("Non autorizzato").
3. Se l'autenticazione ha successo, assegna l'oggetto utente a `req.user` e passa il controllo al middleware successivo.

### 1. Installazione

Per iniziare, clonare il repository nella cartella di progetto con il seguente comando:

```bash
git clone https://github.com/StormMX/sap_btp_custom_auth.git
```

Installare le dipendenze necessarie:

```bash
npm install passport @sap/xsenv @sap/xssec
```

Se necessario, inserire il middleware in una directory apposita:

```text
srv/
├─ config/
├─ middleware/
│  ├─ custom-auth.js
.  .
.  .
.  .
```

### 2. Configurazione

Assicurarsi che le credenziali del servizio XSUAA siano correttamente configurate. Il modulo @sap/xsenv cercherà le impostazioni nel file di configurazione locale o nelle variabili d'ambiente.

Esempio di file `default-services.json`:

```javascript
{
  "xsuaa": {
    "clientid": "tuo-client-id",
    "clientsecret": "tuo-client-secret",
    "url": "https://tuo-dominio-xsuaa",
    "verificationkey": "chiave-di-verifica"
  }
}
```

### 3. Utilizzo

Importare il modulo e utilizza il middleware authenticateJWT per proteggere le rotte dell'applicazione desiderata.

```javascript
const express = require('express');
const { authenticateJWT } = require('./tuo-percorso');

const app = express();

app.get('/test', authenticateJWT, (req, res) => {
    res.send(`Benvenuto, ${req.user.name || 'utente'}!`);
});

app.listen(3000, () => {
    console.log('Server in esecuzione sulla porta 3000');
});
```

In questo esempio, la rotta `/test` richiede un token JWT valido per accedere. In caso contrario, verrà restituito un errore 401 ("Non autorizzato").

## Note

Il middleware utilizza `{ session: false }` con Passport, pertanto non viene mantenuta una sessione lato server.

Per segnalare bug o suggerire miglioramenti, utilizza il sistema di Issues del repository GitHub.
