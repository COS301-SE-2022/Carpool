import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  //* USERS* //
  //: Admin User
  let salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash('Carpool5620', salt);
  const adminUser = await prisma.adminUser.create({
    data: {
      name: 'Benjamin',
      surname: 'Osmers',
      email: 'bennie1419@gmail.com',
      password: hashedPassword,
    },
  });

  //: Main User
  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool997', salt);
  const user = await prisma.user.create({
    data: {
      name: 'Benjamin',
      surname: 'Osmers',
      email: 'u16068344@tuks.co.za',
      university: 'University of Pretoria',
      studentNumber: '16068344',
      password: hashedPassword,
      cellNumber: '0716002219',
      isValidated: true,
      isDriver: true,
      profilePic: '',
    },
  });

  //: Driver 1
  const driver1 = await prisma.driver.create({
    data: {
      userId: user.id,
      idNumber: '9705205007086',
      license: '',
      licensePlate: 'FSG917L',
      model: 'Toyota Fortuner',
      carPicture: '',
    },
  });

  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool997', salt);
  const user2 = await prisma.user.create({
    data: {
      name: 'Claire',
      surname: 'Causey',
      email: 'u12049605@tuks.co.za',
      university: 'University of Pretoria',
      studentNumber: '12049605',
      password: hashedPassword,
      cellNumber: '0144952654',
      isValidated: true,
      isDriver: true,
      profilePic: '',
    },
  });

  //: Driver 2
  const driver2 = await prisma.driver.create({
    data: {
      userId: user2.id,
      idNumber: '0105076780185',
      license: '',
      licensePlate: 'CZY1238',
      model: 'Honda CBR1000RR',
      carPicture: '',
    },
  });

  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool997', salt);
  const user3 = await prisma.user.create({
    data: {
      name: 'Brand',
      surname: 'Keighley',
      email: 'u15379753@@student.uj.ac',
      university: 'University of Johannesburg',
      studentNumber: '15379753',
      password: hashedPassword,
      cellNumber: '0434921917',
      isValidated: true,
      isDriver: true,
      profilePic: '',
    },
  });

  //: Driver 3
  const driver3 = await prisma.driver.create({
    data: {
      userId: user3.id,
      idNumber: '0205172674181',
      license: '',
      licensePlate: '542CLJ',
      model: 'Suzuki RM65',
      carPicture: '',
    },
  });

  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool997', salt);
  const user4 = await prisma.user.create({
    data: {
      name: 'Ray',
      surname: 'Ellison',
      email: 'u06659840@stu.ukzn.ac.za',
      university: 'University of KwaZulu-Natal',
      studentNumber: '06659840',
      password: hashedPassword,
      cellNumber: '0544950849',
      isValidated: true,
      isDriver: true,
      profilePic: '',
    },
  });

  //: Driver 3
  const driver4 = await prisma.driver.create({
    data: {
      userId: user4.id,
      idNumber: '0007069085087',
      license: '',
      licensePlate: 'GMXC33',
      model: 'Bmw X5',
      carPicture: '',
    },
  });

  //: Passenger 1
  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool998', salt);
  const passenger1 = await prisma.user.create({
    data: {
      name: 'Ashleigh',
      surname: 'Govender',
      email: 'u20528834@tuks.co.za',
      university: 'University of Pretoria',
      studentNumber: '20528834',
      password: hashedPassword,
      cellNumber: '0786944692',
      isValidated: true,
      profilePic: '',
    },
  });

  //: Passenger 2
  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool998', salt);
  const passenger2 = await prisma.user.create({
    data: {
      name: 'Jason',
      surname: 'Antalis',
      email: 'u19141859@tuks.co.za',
      university: 'University of Pretoria',
      studentNumber: '19141859',
      password: hashedPassword,
      cellNumber: '0747999714',
      isValidated: true,
      profilePic: '',
    },
  });

  //: Passenger 3
  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool998', salt);
  const passenger3 = await prisma.user.create({
    data: {
      name: 'Tony',
      surname: 'Selby',
      email: 'u91036170@student.uj.ac',
      university: 'University of Johannesburg',
      studentNumber: '91036170',
      password: hashedPassword,
      cellNumber: '0834944000',
      isValidated: true,
      profilePic: '',
    },
  });

  //: Passenger 4
  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool998', salt);
  const passenger4 = await prisma.user.create({
    data: {
      name: 'Sanjay',
      surname: 'Mckinney',
      email: 'u68943616@student.uj.ac',
      university: 'University of Johannesburg',
      studentNumber: '68943616',
      password: hashedPassword,
      cellNumber: '0855310258',
      isValidated: true,
      profilePic: '',
    },
  });

  //: Passenger 5
  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool998', salt);
  const passenger5 = await prisma.user.create({
    data: {
      name: 'Kiara',
      surname: 'Smith',
      email: 'u87975564@mandela.ac.za',
      university: 'Nelson Mandela University',
      studentNumber: '87975564',
      password: hashedPassword,
      cellNumber: '0855310258',
      isValidated: true,
      profilePic: '',
    },
  });

  //: Passenger 6
  salt = await bcrypt.genSalt();
  hashedPassword = await bcrypt.hash('Carpool998', salt);
  const passenger6 = await prisma.user.create({
    data: {
      name: 'Wesley',
      surname: 'Pachai',
      email: 'u20578688@tuks.co.za',
      university: 'University of Pretoria',
      studentNumber: '20578688',
      password: hashedPassword,
      cellNumber: '0826674272',
      isValidated: true,
      profilePic: '',
    },
  });
  let tripDate = new Date();
  tripDate.setDate(tripDate.getDate() + 1);

  const trip1 = await prisma.trip.create({
    data: {
      tripDate: tripDate,
      seatsAvailable: 3,
      price: 30,
      coordinates: {
        create: [
          {
            address:
              'Eco Lake, Tamarillo Street, Eco-Park Estate, Centurion, South Africa',
            latitude: '-25.8858077',
            longitude: '28.1760277',
          },
          {
            address:
              'University of Pretoria, Lynnwood Rd, Hatfield, Pretoria, South Africa',
            latitude: '-25.7545492',
            longitude: '28.2314476',
          },
        ],
      },
      driver: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  tripDate = new Date();
  tripDate.setDate(tripDate.getDate() - 2);
  const trip2 = await prisma.trip.create({
    data: {
      tripDate: tripDate,
      seatsAvailable: 3,
      price: 60,
      coordinates: {
        create: [
          {
            address: 'Woodhill Golf Estate, Pretoria, South Africa',
            latitude: '-25.8149972',
            longitude: '28.3155101',
          },
          {
            address:
              'University of Pretoria, Lynnwood Rd, Hatfield, Pretoria, South Africa',
            latitude: '-25.7545492',
            longitude: '28.2314476',
          },
        ],
      },
      driver: {
        connect: {
          id: user2.id,
        },
      },
    },
  });

  tripDate = new Date();
  tripDate.setDate(tripDate.getDate() + 5);

  const trip3 = await prisma.trip.create({
    data: {
      tripDate: tripDate,
      seatsAvailable: 2,
      price: 100,
      coordinates: {
        create: [
          {
            address:
              'The Bolton, Sturdee Avenue, Rosebank, Johannesburg, South Africa',
            latitude: '-26.1488506',
            longitude: '28.0394921',
          },
          {
            address:
              'University Of Johannesburg, University Road, Auckland Park, Johannesburg, South Africa',
            latitude: '-26.1840135',
            longitude: '27.9978102',
          },
        ],
      },
      driver: {
        connect: {
          id: user3.id,
        },
      },
    },
  });

  //* BOOKINGS *//
  //: Booking 1
  const booking1 = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: passenger1.id,
        },
      },
      trip: {
        connect: {
          tripId: trip1.tripId,
        },
      },
      seatsBooked: 1,
      price: 30,
      status: 'unpaid',
    },
  });

  //: Booking 2
  const booking2 = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: passenger2.id,
        },
      },
      trip: {
        connect: {
          tripId: trip1.tripId,
        },
      },
      seatsBooked: 1,
      price: 30,
      status: 'unpaid',
    },
  });

  //: Booking 3
  const booking3 = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: passenger6.id,
        },
      },
      trip: {
        connect: {
          tripId: trip1.tripId,
        },
      },
      seatsBooked: 1,
      price: 30,
      status: 'unpaid',
    },
  });

  //: Booking 4
  const booking4 = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: passenger1.id,
        },
      },
      trip: {
        connect: {
          tripId: trip2.tripId,
        },
      },
      seatsBooked: 1,
      price: 60,
      status: 'unpaid',
    },
  });

  //: Booking 5
  const booking5 = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: passenger2.id,
        },
      },
      trip: {
        connect: {
          tripId: trip2.tripId,
        },
      },
      seatsBooked: 1,
      price: 60,
      status: 'unpaid',
    },
  });

  //: Booking 6
  const booking6 = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: user2.id,
        },
      },
      trip: {
        connect: {
          tripId: trip2.tripId,
        },
      },
      seatsBooked: 1,
      price: 60,
      status: 'unpaid',
    },
  });

  //: Booking 7
  const booking7 = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: passenger3.id,
        },
      },
      trip: {
        connect: {
          tripId: trip3.tripId,
        },
      },
      seatsBooked: 1,
      price: 100,
      status: 'unpaid',
    },
  });

  //: Booking 8
  const booking8 = await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: passenger4.id,
        },
      },
      trip: {
        connect: {
          tripId: trip3.tripId,
        },
      },
      seatsBooked: 1,
      price: 100,
      status: 'unpaid',
    },
  });

  //: Pickup Location
  const pickUp1 = await prisma.pickupLocation.create({
    data: {
      address: '1060 Edwards Road, Eldoraigne, Centurion, South Africa',
      latitude: '-25.8487678',
      longitude: '28.1613571',
      booking: {
        connect: {
          bookingId: booking1.bookingId,
        },
      },
    },
  });

  const pickUp2 = await prisma.pickupLocation.create({
    data: {
      address: '233 Rupert Street, Brooklyn, Pretoria, South Africa',
      latitude: '-25.7619193',
      longitude: '28.2448732',
      booking: {
        connect: {
          bookingId: booking2.bookingId,
        },
      },
    },
  });

  const pickUp3 = await prisma.pickupLocation.create({
    data: {
      address: '1015 Stanza Bopape Street, Hatfield, Pretoria, South Africa',
      latitude: '-25.7439662',
      longitude: '28.2304697',
      booking: {
        connect: {
          bookingId: booking3.bookingId,
        },
      },
    },
  });

  const pickUp4 = await prisma.pickupLocation.create({
    data: {
      address: '233 Rupert Street, Brooklyn, Pretoria, South Africa',
      latitude: '-25.7619193',
      longitude: '28.2448732',
      booking: {
        connect: {
          bookingId: booking4.bookingId,
        },
      },
    },
  });

  const pickUp5 = await prisma.pickupLocation.create({
    data: {
      address: '1015 Stanza Bopape Street, Hatfield, Pretoria, South Africa',
      latitude: '-25.7439662',
      longitude: '28.2304697',
      booking: {
        connect: {
          bookingId: booking5.bookingId,
        },
      },
    },
  });

  const pickUp6 = await prisma.pickupLocation.create({
    data: {
      address: '61 Alexander Street, Brooklyn, Pretoria, South Africa',
      latitude: '-25.7592019',
      longitude: '28.240653',
      booking: {
        connect: {
          bookingId: booking6.bookingId,
        },
      },
    },
  });

  const pickUp7 = await prisma.pickupLocation.create({
    data: {
      address:
        'Blue Glacier Diamonds, North Avenue, Riviera, Johannesburg, South Africa',
      latitude: '-26.16202999999999',
      longitude: '28.0478',
      booking: {
        connect: {
          bookingId: booking7.bookingId,
        },
      },
    },
  });

  const pickUp8 = await prisma.pickupLocation.create({
    data: {
      address: '59 Private Rd, Power Park, Soweto, South Africa',
      latitude: '-26.2582335',
      longitude: '27.929454',
      booking: {
        connect: {
          bookingId: booking8.bookingId,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
