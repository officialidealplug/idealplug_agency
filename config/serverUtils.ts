//This serves as utility functions for server side operations

//Libraries -->
import { google } from "googleapis";

//Commencing code -->

//Declaring the neccesary variables for google sheet api
const data = {
    type: process.env.NEXT_PUBLIC_TYPE!,
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID!,
    private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID!,
    private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY!.replace(/\\n/g, '\n'),//process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    //private_key: JSON.parse(process.env.NEXT_PUBLIC_PRIVATE_KEY!),
    client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL!,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    auth_uri: process.env.NEXT_PUBLIC_AUTH_URI!,
    token_uri: process.env.NEXT_PUBLIC_TOKEN_URI!,
    auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_AUTH_PROVIDER_X509_CERT_URL!,
    client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL!,
    universe_domain: process.env.NEXT_PUBLIC_UNIVERSE_DOMAIN!,
}

///This function allows one to perform CRUD operation using Google Sheet
export const GoogleSheetStore = async (sheetId: string) => {
    //Initializing credentials
    const auth = await google.auth.getClient({
        projectId: data.project_id,
        credentials: {
          type: data.type,
          private_key: data.private_key,
          client_email: data.client_email,
          client_id: data.client_id,
          token_url: data.token_uri,
          universe_domain: data.universe_domain,
        },
        scopes: [
          "https://www.googleapis.com/auth/spreadsheets",
        ],
    });
    
    const sheets = google.sheets({ version: "v4", auth: auth });

    //This function appends new sheet
    const addSheet = async (sheetRange: string, datas: { [key: string]: any }) => {
        //const sheetName = "Sheet1"

        const info =  await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${sheetRange}`, //`${sheetName}!A:B`,
            valueInputOption: 'USER_ENTERED',
            //insertDataOption: 'INSERT_ROWS',
            requestBody: {
              values: [
                Object.values(datas)
              ]
            }
        }, {});

        //console.log("Info: ", info)
        return info
    }

    // const deleteFile = async (fileId: string ) => {
    //     return await googleDrive.deleteFile(fileId)
    // }

    return {
        addSheet
    }
}