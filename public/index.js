'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(cars);
console.log(rentals);
console.log(actors);


// STEP 1

function differenceDate(date1, date2)
{
  var difference = date2.getTime() - date1.getTime();
  return difference/(1000*24*60*60);
}

function rentalPrice()
{
  for (var rental of rentals)
  {
    for (var car of cars)
    {
      if (rental.carId == car.id)
      {
        const date1 = new Date(rental.pickupDate);
        const date2 = new Date(rental.returnDate);

        var price_time = (differenceDate(date1,date2)+1)*car.pricePerDay
        var price_distance = rental.distance*car.pricePerKm

        console.log(`Rental price for ${rental.driver.firstName} ${rental.driver.lastName}:`);
        var rental_price = price_distance + price_time;
        rental.price = rental_price;
        console.log(rental_price);
        break;
      }
    }
  }
}

rentalPrice();

// STEP 2

function newRentalPrice()
{
  for (var rental of rentals)
  {
    for (var car of cars)
    {
      if (rental.carId == car.id)
      {
        const date1 = new Date(rental.pickupDate);
        const date2 = new Date(rental.returnDate);
        const diff_date = (differenceDate(date1,date2)+1) ;

        var factor=1;
        if(diff_date>1)
        {
          factor=0.90;
        }
        if(diff_date>4)
        {
          factor=0.70;
        }
        if(diff_date>10)
        {
          factor=0.50;
        }

        var price_time = diff_date*car.pricePerDay;
        var price_distance = rental.distance*car.pricePerKm;

        console.log(`Rental price for ${rental.driver.firstName} ${rental.driver.lastName}:`);
        var rental_price = price_distance + price_time*factor;
        rental.price = rental_price;
        console.log(rental_price);
        break;
      }
    }
  }
}

newRentalPrice();

// STEP 3

function commissionRepartition()
{
  for (var rental of rentals)
  {
    const date1 = new Date(rental.pickupDate);
    const date2 = new Date(rental.returnDate);
    const diff_date = (differenceDate(date1,date2)+1) ;

    rental.commission.insurance = rental.price * 0.30 * 0.50;
    rental.commission.treasury = 1*diff_date;
    rental.commission.virtuo = rental.price * 0.30 - rental.commission.insurance - rental.commission.treasury;
  }
}

commissionRepartition();

// STEP 4

function newPriceWithOption()
{
  for (var rental of rentals)
  {
    if(rental.options.deductibleReduction == true)
    {
      const date1 = new Date(rental.pickupDate);
      const date2 = new Date(rental.returnDate);
      const diff_date = (differenceDate(date1,date2)+1);

      rental.price = rental.price+4*diff_date;
      rental.commission.virtuo = rental.commission.virtuo+4*diff_date;
    }
  }

}

newPriceWithOption();

// STEP 5

function payment()
{
  for (var rental of rentals)
  {
    for (var actor of actors)
    {
      if (actor.rentalId == rental.id)
      {
        actor.payment[0].amount = rental.price;
        actor.payment[1].amount = rental.price - (rental.commission.insurance+rental.commission.treasury+rental.commission.virtuo);
        actor.payment[2].amount = rental.commission.insurance;
        actor.payment[3].amount = rental.commission.treasury;
        actor.payment[4].amount = rental.commission.virtuo;
      
      }
    }
  }
}
console.log(actors)

payment();