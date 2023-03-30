import {flatMap, map, Observable, Observer} from 'rxjs';

class Vegetable {
    name: string;
    size: number;
}

const observable = Observable.create((observer: any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
});

const observable2 = Observable.create((observer: Observer<Vegetable[]>) => {
    observer.next([{
        "name": "tomato",
        "size": 10
    },
        {
            "name": "pineapple" ,
            "size": 50
        }])
    observer.complete()
    return observer
}).pipe(
    map(value => {
        console.log(value)
        return value
    }),
    flatMap(value => value as any)
)

observable2.subscribe(
    (x: Vegetable) => pushName(x)
)
observable.subscribe(
    (x: any) => logItem(x),
    (error: any) => logItem('Error: ' + error),
    () => logItem('Completed')
);

function logItem(val: any) {
    console.log(val)
    const node = document.createElement("li");
    const textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}

function pushName(x: Vegetable) {
    console.log(x)
    const node = document.createElement("li");
    const textnode = document.createTextNode(x.name);
    node.appendChild(textnode);
    document.getElementById("vegetables").appendChild(node);
}