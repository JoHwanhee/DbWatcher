# DbWatcher
The Mongodb Collection watcher, it recognizes change data log in real-time. Mongodb has db.collection.watch() function. But that supports 4.0v over.  

It can use db.collection.watch stream. below 4.0v in MongoDB

# Usage 
```javascript
const MongoCollectionWatcher = require('./mongoCollectionWatcher/mongoCollectionWatcher.js');

watcher = new MongoCollectionWatcher();
watcher.initDB('mongodb+srv://hwanhee:hwanhee@cluster0-89apv.mongodb.net/english-learning-localdev', 'english-learning-localdev');
watcher.watch('users', 1000, (status, id, key, before, after) => {
    switch (status) {
        case 'insert':
            // todo something
            break;
        case 'changed':
            // todo something
            break;
        case 'delete':
            // todo something
            break;
        case 'same':
            // toso something
        default:
            break;
    }
});
```

# Dependency
"mongodb": "~3.0.8",
"deep-diff": "~1.0.2",
