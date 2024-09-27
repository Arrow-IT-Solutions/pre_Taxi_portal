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
    orientation?:string,
    paperSize?: string
}

export interface PrinterConfig {
  printerNameReceipt1:string
        printerNameReceipt2 :string
        printerNameCash : string,
        printerNameBarcode : string,
        Cert : string,
        key:string
}

export interface PrinterCertificate {
        Cert : string,
        key:string
}


@Injectable({
    providedIn: 'root',
  })

  export class PrintService {

    public printerConfig :PrinterConfig;
    public printerCertificate :PrinterCertificate;

    
    qzConnected: boolean = false;


    constructor()
    {
        
       this.SetCertificate();
    }

   private SetCertificate()
    {

      if(this.printerCertificate != null)
      {

        console.log(this.printerCertificate);

        let privateKey = this.printerCertificate.key
        const publickey = this.printerCertificate.Cert
            
        
            
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
        this.SetCertificate();
        this.ensureQZConnection().then(() => {
            if (this.qzConnected) {
            //   const labelContent = document.getElementById('printArea')?.outerHTML || '';
  
      
              const config = qz.configs.create(setting.printerName, {
                // size: {  width: setting.width, height: setting.height },
                paperSize:setting.paperSize,  // Set size for the label
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


