const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://hasini47573_db_user:Hasini6268@eventregistrationcluste.vviairn.mongodb.net/?appName=EventRegistrationCluster";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        await client.db("admin").command({ ping: 1 });

        console.log("✅ Pinged your deployment. Successfully connected to MongoDB!");

    } catch (error) {
        console.log("❌ MongoDB Test Failed:");
        console.log(error.message);
    } finally {
        await client.close();
    }
}

run();