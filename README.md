# DbWatcher
The Mongodb Collection watcher, it recognizes change data log in real-time. Mongodb has db.collection.watch() function. But that supports 4.0v over.  

It can use db.collection.watch stream below 4.0v in MongoDB

# Usage 
```javascript
const MongoCollectionWatcher = require('./mongoCollectionWatcher/mongoCollectionWatcher.js');

watcher = new MongoCollectionWatcher('db-url', 'db-name');
watcher.watch('collectionName', IntervalMilSec, (change) => {
    let status = change['status'];
    let id = change['id'];
    let key = change['key'];
    let before = change['before'];
    let after = chagne['after'];

    switch (status) {
        case 'inserted':
            // todo
            break;
        case 'changed':
            // todo
            break;
        case 'deleted':
            // todo
            break;
        case 'same':
            // todo
            break;
        default:
            break;
    }
});
```

change
```json
{ status: 'same',
  id: '',
  key: '',
  before:
   [ { _id: 5c40886f1c9d440000920be5,
       subscriptionLesson: 2,
       extraSubscriptionLesson: 1,
       completedSubscriptionLesson: 1,
       completedExtraSubscriptionLesson: 1,
       currentPackage: 'currentPackage',
       trialLessonLimit: 3,
       fullName: 'johwanhee',
       email: 'kikiki0611@naver.com',
       createdAt: '2019-01-11T15:04:42.371+00:00',
       updatedAt: '2019-01-11T15:04:42.371+00:00' } ],
  after:
   [ { _id: 5c40886f1c9d440000920be5,
       subscriptionLesson: 2,
       extraSubscriptionLesson: 1,
       completedSubscriptionLesson: 1,
       completedExtraSubscriptionLesson: 1,
       currentPackage: 'currentPackage',
       trialLessonLimit: 3,
       fullName: 'johwanhee',
       email: 'kikiki0611@naver.com',
       createdAt: '2019-01-11T15:04:42.371+00:00',
       updatedAt: '2019-01-11T15:04:42.371+00:00' } ] }
```
# Dependency
"mongodb": "~3.0.8",  
"deep-diff": "~1.0.2",  
