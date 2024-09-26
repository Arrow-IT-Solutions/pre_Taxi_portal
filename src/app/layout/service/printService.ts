import { Injectable } from "@angular/core";
import { KJUR, KEYUTIL, stob64, hextorstr } from 'jsrsasign';

const qz = require("qz-tray");
// import * as  qz from '../../src/assets/js/';
declare var require: any;
declare var jQuery: any;
import * as $ from 'jquery';
import * as juice from 'juice';


export interface Setting {
    printerName : string,
    unit:string,
    width:number,
    height:number,
    copies:number,
    orientation?:string
}


@Injectable({
    providedIn: 'root',
  })

  export class PrintService {

    qzConnected: boolean = false;


    constructor()
    {
        this.SetCertificate();
    }

   private SetCertificate()
    {
        let privateKey = `-----BEGIN PRIVATE KEY-----
        MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDVgekMcwXdmtVX
        qaiPuiLaD7hPrj9UJ3x/qHwOinH1kkl3t0oNUb7f+a/1Daj00YPDs4qpsXaoVsH6
        ck2qfVva+p6/Y1RTMj/wIfTlacQI58aJ8aniNwY9RwEghGkAEEh0gqinJLq8MvNz
        xLxdLaZyh6d5dCdGH3iMKebqHHEmOg8Wha+tQiGDuaxg+hgTjnvk2C1fzpHASF8I
        cgBXK+18n1c8nvMd0EAs7E/3smU0k5sm09TE+TYOCmnA12fUnhSclxgAgOqUvaya
        gKxsMZZwNFlbnzkUJDkzhvsPSVgQhRr++LrLiZMOWKmeLCxducqIDHW+hOwbyEZs
        /Yu49XzRAgMBAAECggEADcB01MRHK/CwQ28I4t0FJ/txjnxK1ZjyKBIfj3DeXzKs
        FbsSA3fw7eHaB1QjvkUNEhqrLeaMHdKcuDdgMOuAckMd3MuWildHDqij6pox3LWl
        BYyHDywmdDrxuSOeKbliw/0Ib4o/ltCcpVJreYBFDhprsI3JMSHkyfkG8lb2ThUQ
        HxrZM6/l4n2EIU28kpSxGC9kjU/IAZwIBK+/blntbCgEkm7v1OoS9gyOJwqpk2al
        CpthYvyx5vM3qENI0iB3RtJylDM5F5EqaeWNSGx3aCs6e52gvQUZaF0gs+8pZ2KB
        ZuFeW124tfEK4bI9RDQkKl6pqqJpBmh0NfSAPQVigwKBgQDvq3HIBQRp8QWumWvO
        VW69CjSA5xx+LGzGFcve2/zSYV7JO3o3Oubbs82BNMh/hdyXWchakb97Oge44LnB
        W+zcLeweWLDdmLYn8ZdlseXSS8K22VONWzeIPRmtvEXvDKt9Taoturr5b8I3MMyR
        QBV8lqC+LjuB6gZGp8yEmAeM6wKBgQDkDh5EWoQnZv4vcJ3fJZoE2Q2eimeK5YQw
        CTavbdHqaYKivQ6Pw8kQsTpJ43tpdDKYn3aj+TjY1uoP1Eh7Zb40Zuv8AwRmxk0K
        bsDLNkXp97VtvEwnmsXUyW9evxBOtjUf6HgHdO4XXudCZpgKO/NYX6WC3SGzpgoC
        iQRhTxq+MwKBgQC3Rl+oGU4axZkWv3PVQTeBkAA+Yn1Dby1u/NP+BDP9nUAimj0H
        Zx+K+qA4IekAu5jIlHvF5paK4QFuu0rRNj6W0Pcy7ZeynUkOmoyv065vdkfcE6z0
        98Ariq3MUaEZAJNTKsTsW1MH1BKsqcCFgn/r2jPpuuj+m7tY5JBdBPUhKQKBgQCv
        jxrHvfKsLoIQ3R37UYP+pWTxnlRVPZiELiOV6vHFBdJWGzohfDPFkNlxVhiENrpY
        ebGoS0vyyYdIBkCCFfHVf0G9MElsIM3f8SCjjzVFBrb5MhJiDqiqxSLiCi2wml3N
        IXV9MAu1nA5lNHtorXwIlSDh2/98v55HE1l226GXtwKBgQCkJP/i+OFddb7c099A
        IEorvfHlptyF/fI/tC4MwBxylf56SnsLoovVQ4XnGl3AoWHCr4Xfz4epVQsL80pn
        QWPMyVjW/0bKYS2sbBs2oShc12f0hDQHZj287XkWXHks/KNEdh0gaXdxLq4h2WF7
        bS9I3cxFIqSIqJcRMKP+KejDqw==
        -----END PRIVATE KEY-----`
                const publickey = `-----BEGIN CERTIFICATE-----
        MIIDuTCCAqGgAwIBAgIUd5eDk4nvDAvGqTbkTXKRX9jFbVMwDQYJKoZIhvcNAQEL
        BQAwazELMAkGA1UEBhMCSk8xDjAMBgNVBAgMBUFtbWFuMQ4wDAYDVQQHDAVBbW1h
        bjEbMBkGA1UECgwSQXJyb3cgSVQgU29sdXRpb25zMQswCQYDVQQLDAJJVDESMBAG
        A1UEAwwJbG9jYWxob3N0MCAXDTI0MDkxNTExMzMyNVoYDzIwNTYwMzEwMTEzMzI1
        WjBrMQswCQYDVQQGEwJKTzEOMAwGA1UECAwFQW1tYW4xDjAMBgNVBAcMBUFtbWFu
        MRswGQYDVQQKDBJBcnJvdyBJVCBTb2x1dGlvbnMxCzAJBgNVBAsMAklUMRIwEAYD
        VQQDDAlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDV
        gekMcwXdmtVXqaiPuiLaD7hPrj9UJ3x/qHwOinH1kkl3t0oNUb7f+a/1Daj00YPD
        s4qpsXaoVsH6ck2qfVva+p6/Y1RTMj/wIfTlacQI58aJ8aniNwY9RwEghGkAEEh0
        gqinJLq8MvNzxLxdLaZyh6d5dCdGH3iMKebqHHEmOg8Wha+tQiGDuaxg+hgTjnvk
        2C1fzpHASF8IcgBXK+18n1c8nvMd0EAs7E/3smU0k5sm09TE+TYOCmnA12fUnhSc
        lxgAgOqUvayagKxsMZZwNFlbnzkUJDkzhvsPSVgQhRr++LrLiZMOWKmeLCxducqI
        DHW+hOwbyEZs/Yu49XzRAgMBAAGjUzBRMB0GA1UdDgQWBBTd6xa0Uxuwn7ft3W4b
        QAgSjjqXADAfBgNVHSMEGDAWgBTd6xa0Uxuwn7ft3W4bQAgSjjqXADAPBgNVHRMB
        Af8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQA/bec0Wpjo0pc5h2tbpuTBPOcx
        LJjArPcolx1ksd91JANgnvsmGRRH1+PXc4tpOaN0W1gIuJfS+FmmA0Ag1MGtNdTa
        XFK18uvLHAv0+zCDoei0EV9ep5ou3e1BPprKotHD8eq9tSyFxQLzoGDaanqakLX4
        wU3gY72fGxRHrsjSuc4XpaiUENzAqST8dyW7Wn4vMr3PRK0SBldhLlNHUHhioGKe
        KlCxCou3HI6+cQMR8PqhCuJeGgpFnYyM2qYUZ3sh8rBNPJtKN8pSo28lIKWdcsHF
        0SYeGOjgvwQXsZ2ALTAGz05QTDRW6i2UYGS51TsAgEamo/97dSWj5rwY3Z6F
        -----END CERTIFICATE-----`
            
        
            
                qz.security.setCertificatePromise(function (resolve: any, reject: any) {
                  console.log('Set Certificate');
                  resolve(publickey);
                });
        
            
        qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1
        qz.security.setSignaturePromise(function(toSign: any) {
          return function(resolve: any, reject: any) {
              try {
                  var pk = KEYUTIL.getKey(privateKey);
                  var sig = new KJUR.crypto.Signature({"alg": "SHA512withRSA"});  // Use "SHA1withRSA" for QZ Tray 2.0 and older
                  sig.init(pk); 
                  sig.updateString(toSign);
                  var hex = sig.sign();
                  console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
                  resolve(stob64(hextorstr(hex)));
              } catch (err) {
                  console.error(err);
                  reject(err);
              }
          };
        });
    }

    private strip(key :any) {
        if (key.indexOf('-----') !== -1) {
            return key.split('-----')[2].replace(/\r?\n|\r/g, '');
        }
    }

    private connectQZTray() {
        qz.api.setPromiseType((promiseFn: (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void) => new Promise(promiseFn));
        return qz.websocket.connect()
          .then(() => {
            console.log('Connected to QZ Tray');
            this.qzConnected = true;
          })
          .catch((err: any) => {
            console.error('Failed to connect to QZ Tray', err);
            this.qzConnected = false;
          });
      }

      private ensureQZConnection() {
        if (!this.qzConnected) {
          return this.connectQZTray();
        }
        return Promise.resolve();
      }


      public Print(contentHtml : string , setting:Setting )
      {
        this.ensureQZConnection().then(() => {
            if (this.qzConnected) {
            //   const labelContent = document.getElementById('printArea')?.outerHTML || '';
  
      
              const config = qz.configs.create(setting.printerName, {
                // size: {  width: setting.width, height: setting.height },
                paperSize: 'A5',  // Set size for the label
                units: setting.unit,
                copies: setting.copies, 
                orientation : setting.orientation
              });
      
              const printData = [
                {
                  type: 'html',
                  format: 'plain',
                  data: contentHtml
                }
              ];
      
              qz.print(config, printData).then(() => {
                console.log('Label printed successfully!');
              }).catch((err: any) => {
                console.error('Failed to print label', err);
              });
            } else {
              console.error('Cannot print: QZ Tray is not connected');
            }
          }).catch((err: any) => {
            console.error('Error ensuring QZ connection', err);
          });
        }
      }


