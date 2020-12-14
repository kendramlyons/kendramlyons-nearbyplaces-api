const place1 = {
    name: 'The Taco Shop Co.',
    address: '1350 E Broadway Blvd, Tucson, AZ 85719',
    image: 'tacoshop.jpg',
    reviews: [{text:' Delicious! ',
                rating: '*****'}, 
            {text:' Amazing burritos. ',
                rating: '*****'},
            {text:' Tasty and affordable! ',
                rating: '****'},
            {text:' Good window and drive through service. ',
            rating: '****'}]
}
const place2 = {
    name: 'Barrio Brewing',
    address: '800 E 16th St, Tucson, AZ 85719',
    image: 'barrio.jpg',
    reviews: [{text:' Fabulous beer! ',
                rating: '*****'}, 
            {text:' Amazing wings. ',
                rating: '*****'},
            {text:' Awesome atmosphere! ',
                rating: '*****'},
            {text:' Great dine-in and take-out services. ',
            rating: '*****'}]
}
const place3 = {
    name: 'Tall Boys/La Cocina',
    address: '201 N Court Ave, Tucson, AZ 85701',
    image: 'laco.jpg',
    reviews: [{text:' Best brunch! ',
                rating: '*****'}, 
            {text:' Love the savory corn cakes. ',
                rating: '*****'},
            {text:' Great veg options! ',
                rating: '*****'},
            {text:' Outdoor dining at its funnest. ',
            rating: '*****'}]
}
const place4 = {
    name: 'Tumerico',
    address: '2526 E 6th St, Tucson, AZ 85716',
    image: 'tumerico.jpg',
    reviews: [{text:' Best vegan Mexican food! ',
                rating: '*****'}, 
            {text:' Love the tamales. ',
                rating: '*****'},
            {text:' Gourmet veg options! ',
                rating: '*****'},
            {text:' Delicious lattes & Turkish coffee. ',
            rating: '*****'}]
}

let places = [place1, place2, place3, place4];

module.exports.places = places;