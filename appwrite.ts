import { Client, Account, ID, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(`${process.env.NEXT_PUBLIC_REACT_APP_ENDPOINT}`) // Your API Endpoint
  .setProject(`${process.env.NEXT_PUBLIC_REACT_APP_PROJECT}`); // Your project ID

const account = new Account(client);

const databases = new Databases(client);

export const appwrite = { account, databases, ID };
