import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  //* USERS* //
  //: Main User
  let salt = await bcrypt.genSalt();
  let hashedPassword = await bcrypt.hash('Carpool997', salt);
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
      profilePic: '',
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

  //* TRIPS *//
  //: Trip 1
  const tripDate = new Date();
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
            longitude: ' 28.2314476',
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
