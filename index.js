// import express from 'express';
// import cors from 'cors';
// import request from 'request-promise';
// import router from './routes/record.js';
// // import db from './db/connection.js';

// // const uri="mongodb+srv://2019raksha:8LyZBytAKKRJ3Hjn@cluster0.drtqlq4.mongodb.net/"


// const uri = "mongodb+srv://2019raksha:8LyZBytAKKRJ3Hjn@cluster0.drtqlq4.mongodb.net/";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   if (err) {
//     console.error('An error occurred connecting to MongoDB:', err);
//     return;
//   }
//   console.log('Connected to MongoDB');
// });

// const app = express();
// app.use(cors());


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// const PORT = 5009;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// app.get('/api', async (req, res) => {
//     let codechef_username = "agastya_3636";
//     let leetcode_username = "Agastya3636";
//     let codeforces_username = "agastya3636";
//     let codechef_rating = 0;
//     let leetcode_rating = 0;
//     let codeforces_rating = 0;
//     let codechef_globalrank = 0;
//     let codechef_countryrank = 0;
//     let codechef_stars = 0;
//     let codeforces_globalrank = 0;
//     let codeforces_countryrank = 0;
//     let codeforces_maxrating = 0;
//     let codeforces_maxrank = "";
//     let leetcode_globalrank = 0;

//     let options = {
//     'method': 'GET',
//     'url': 'https://codechef-api.vercel.app/'+codechef_username,
//     'headers': {
//     }
//     };
//     request(options, function (error, response) {
//     if (error) throw new Error(error);
//         console.log(response.body);
//         let data = JSON.parse(response.body);
//         //store data in database mongo?
        
//         res.send(response.body);
//     });


    
// });

// app.get('/a', async (req, res) => {
   
// });


// import express from 'express';
// import cors from 'cors';
// import request from 'request-promise';
// import router from './routes/record.js';
// import connectToDatabase from './db/connection.js';
// import path  from 'path';

// const app = express();
// app.use(cors());

// app.get('/', (req, res) => {
//     res.send(__dirname,"/index.html");
// });

// const PORT = 5009;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// app.get('/api', async (req, res) => {
//     let codechef_username = "raksha_31";
//     let codeforces_username = "Agastya_3636";
//     let data;
//     let options = {
//         'method': 'GET',
//         'url': 'https://codechef-api.vercel.app/'+codechef_username,
//         'headers': {}
//     };
//     try {
//         const response = await request(options);
//         console.log(response);
//         data = JSON.parse(response);
//         const db = await connectToDatabase();
//         await db.collection("student_rating").insertOne(data);

//     } catch (error) {
//         console.error('An error occurred:', error);
//         res.status(500).send('An error occurred');
//     }

//     options = {
//         'method': 'GET',
//         'url': 'https://leetcode.com/graphql?query=query%20{%20userContestRanking(username:%20%20%22'+'Agastya3636'+'%22)%20{%20attendedContestsCount%20rating%20globalRanking%20totalParticipants%20topPercentage%20}}',
//         'headers': {}
//     };
//     try {
//         const response = await request(options);
//         console.log(response);
//         data = JSON.parse(response);
//         const db = await connectToDatabase();
//         await db.collection("student_rating").insertOne(data);

//     } catch (error) {
//         console.error('An error occurred:', error);
//         res.status(500).send('An error occurred');
//     }

//     options = {
//         'method': 'GET',
//         'url': 'https://codeforces.com/api/user.info?handles='+codeforces_username+'&checkHistoricHandles=false',
//         'headers': {}
//     };
//     try {
//         const response = await request(options);
//         console.log(response);
//         data = JSON.parse(response);

//         const db = await connectToDatabase();
//         await db.collection("student_rating").insertOne(data);

//         res.send(data);
//     } catch (error) {
//         console.error('An error occurred:', error);
//         res.status(500).send('An error occurred');
//     }
// });

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import connectToDatabase from './db/connection.js';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from "body-parser";
// const request = require('request-promise');


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "veiws"));
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/aboutus.html', (req, res) => {
    res.sendFile(path.join(__dirname, "aboutus.html"));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, "contact.html"));
});

app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, "register.html"));
});

app.get('/codechef.html', async(req, res) =>  {
    let data;
    //connect mongodb and fetch 10 data in sorted order?
    const db = await connectToDatabase();
    data = await db.collection("codechef_rating").find().sort({currentRating:-1}).limit(5).toArray();
    console.log(data);
    res.render("codechef", { data });
});

app.get('/codeforces.html', async (req, res) => {
    let data;
    //connect mongodb and fetch 10 data in sorted order?
    const db = await connectToDatabase();
    data = await db.collection("codeforces_rating").find().sort({rating:-1}).limit(5).toArray();
    console.log(data);
    res.render("codeforces", { data });
});

app.get('/leetcode.html', async (req, res) => {
    let data;
    //connect mongodb and fetch 10 data in sorted order?
    const db = await connectToDatabase();
    data = await db.collection("leetcode_rating").find().sort({rating:-1}).limit(5).toArray();
    console.log(data);
    res.render("leetcode", { data });
});



const PORT = 5009;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post('/upload', async (req, res) => {
    let codechef_username = req.body.codechefusername;
    let leetcode_username = req.body.leetcodeusername;
    let codeforces_username = req.body.codeforcesusername;
    let email = req.body.email;
    let rollno = req.body.Rollno;
    if (codechef_username != null && email != null && rollno != null) {
        storecodechef(codechef_username, email, rollno);
    }
    if (codeforces_username != null && email != null && rollno != null) {
        storecodeforces(codeforces_username, email, rollno);
    }
    if (leetcode_username != null && email != null && rollno != null) {
        storeleetcode(leetcode_username, email, rollno);
    }
    
    res.sendFile(path.join(__dirname, "index.html"));
    
   

   
});

async function storecodechef(username,email,rollno) {
    var d = {};
    d.codechef_username = username;
    d.rollno = rollno;
    d.email = email;
    let options = {
        'method': 'GET',
        'url': 'https://codechef-api.vercel.app/'+username,
        'headers': {}
    };
    try {
        const response = await fetch(options.url, {
            method: options.method,
            headers: options.headers
        });
        const data = await response.json();
        d.profile = data.profile;
        d.name = data.name;
        d.currentRating = data.currentRating;
        d.highestRating = data.highestRating;
        d.globalRank = data.globalRank;
        d.countryRank = data.countryRank;
        d.stars = data.stars;

        const db = await connectToDatabase();
        await db.collection("codechef_rating").insertOne(d);
    } catch (error) {
        console.error('An error occurred:', error);
       
    }
}

async function storeleetcode(username,email,rollno) {
    var d = {};
    d.leetcode_username = username;
    d.rollno = rollno;
    d.email = email;
    let  options = {
        'method': 'GET',
        'url': 'https://leetcode.com/graphql?query=query%20{%20userContestRanking(username:%20%20%22'+username+'%22)%20{%20attendedContestsCount%20rating%20globalRanking%20totalParticipants%20topPercentage%20}}',
        'headers': {}
    };
    try {
        const response = await fetch(options.url, {
            method: options.method,
            headers: options.headers
        });
        const data = await response.json();
        const db = await connectToDatabase();
        d.attendedContestCount = data.data.userContestRanking.attendedContestCount;
        d.rating = data.data.userContestRanking.rating;
        d.globalRanking = data.data.userContestRanking.globalRanking;
        d.totalParticipants = data.data.userContestRanking.totalParticipants;
        d.topPercentage = data.data.userContestRanking.topPercentage;
        await db.collection("leetcode_rating").insertOne(d);
     
    } catch (error) {
        console.error('An error occurred:', error);
        
    }
}
async function storecodeforces(username,email,rollno) {
    var d = {};
    d.codeforces_username = username;
    d.rollno = rollno;
    d.email = email;
    let  options = {
        'method': 'GET',
        'url': 'https://codeforces.com/api/user.info?handles='+username+'&checkHistoricHandles=false',
        'headers': {}
    };
    try {
        const response = await fetch(options.url, {
            method: options.method,
            headers: options.headers
        });
       
        const data = await response.json();
        //  console.log(data.result[0])
        d.rating = data.result[0].rating;
        d.maxRating = data.result[0].maxRating;
        d.rank = data.result[0].rank;
        d.maxRank = data.result[0].maxRank;
        d.country = data.result[0].country;

        const db = await connectToDatabase();
        await db.collection("codeforces_rating").insertOne(d);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

app.get('/leetcode/search', async (req, res) => {
  const rollno = req.query.rollno;

  if (!rollno) {
    // If the `rollno` query parameter is not present, return an error
    return res.status(400).send('Missing `rollno` query parameter');
  }
    const db = await connectToDatabase();
    const data = await db.collection("leetcode_rating").find({rollno:rollno}).toArray();
    res.render('leetcode', { data });     
});

app.get('/codechef/search', async (req, res) => {
  const rollno = req.query.rollno;

  if (!rollno) {
    // If the `rollno` query parameter is not present, return an error
    return res.status(400).send('Missing `rollno` query parameter');
  }
    const db = await connectToDatabase();
    const data = await db.collection("codechef_rating").find({rollno:rollno}).toArray();
    res.render('codechef', { data });     
});

app.get('/codeforces/search', async (req, res) => {
  const rollno = req.query.rollno;

  if (!rollno) {
    // If the `rollno` query parameter is not present, return an error
    return res.status(400).send('Missing `rollno` query parameter');
  }
    const db = await connectToDatabase();
    const data = await db.collection("codeforces_rating").find({ rollno: rollno }).toArray();
    console.log(data);
    res.render('codeforces', { data });     
});