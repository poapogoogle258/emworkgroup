import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const MemberData: Prisma.MemberCreateInput[] = [
  {
    name: 'Alice',
    lastname: 'Smith',
    birthday: new Date('1990-05-15'),
    image: 'https://ui-avatars.com/api/?name=Alice+Smith&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Bob',
    lastname: 'Johnson',
    birthday: new Date('1985-11-22'),
    image: 'https://ui-avatars.com/api/?name=Bob+Johnson&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Charlie',
    lastname: 'Williams',
    birthday: new Date('1992-03-10'),
    image: 'https://ui-avatars.com/api/?name=Charlie+Williams&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'David',
    lastname: 'Brown',
    birthday: new Date('1988-07-03'),
    image: 'https://ui-avatars.com/api/?name=David+Brown&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Emily',
    lastname: 'Jones',
    birthday: new Date('1995-09-18'),
    image: 'https://ui-avatars.com/api/?name=Emily+Jones&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Frank',
    lastname: 'Garcia',
    birthday: new Date('1983-02-28'),
    image: 'https://ui-avatars.com/api/?name=Frank+Garcia&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Grace',
    lastname: 'Miller',
    birthday: new Date('1991-12-05'),
    image: 'https://ui-avatars.com/api/?name=Grace+Miller&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Henry',
    lastname: 'Davis',
    birthday: new Date('1987-06-12'),
    image: 'https://ui-avatars.com/api/?name=Henry+Davis&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Isabella',
    lastname: 'Rodriguez',
    birthday: new Date('1994-04-25'),
    image: 'https://ui-avatars.com/api/?name=Isabella+Rodriguez&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Dev',
    lastname: 'Tester',
    birthday: new Date('2010-01-12'),
    image: 'https://ui-avatars.com/api/?name=Dev+Tester&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Jame',
    lastname: 'Doe',
    birthday: new Date('1999-01-01'),
    image: 'https://ui-avatars.com/api/?name=Jame+Doe&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Kevin',
    lastname: 'Lee',
    birthday: new Date('1986-08-14'),
    image: 'https://ui-avatars.com/api/?name=Kevin+Lee&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Laura',
    lastname: 'Hall',
    birthday: new Date('1997-04-27'),
    image: 'https://ui-avatars.com/api/?name=Laura+Hall&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Mike',
    lastname: 'Moore',
    birthday: new Date('1984-12-09'),
    image: 'https://ui-avatars.com/api/?name=Mike+Moore&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Nancy',
    lastname: 'Clark',
    birthday: new Date('1991-06-02'),
    image: 'https://ui-avatars.com/api/?name=Nancy+Clark&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Oscar',
    lastname: 'Turner',
    birthday: new Date('1988-10-23'),
    image: 'https://ui-avatars.com/api/?name=Oscar+Turner&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Pamela',
    lastname: 'Parker',
    birthday: new Date('1993-02-11'),
    image: 'https://ui-avatars.com/api/?name=Pamela+Parker&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Quentin',
    lastname: 'Cook',
    birthday: new Date('1985-07-18'),
    image: 'https://ui-avatars.com/api/?name=Quentin+Cook&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Ryan',
    lastname: 'Thompson',
    birthday: new Date('1980-04-09'),
    image: 'https://ui-avatars.com/api/?name=Ryan+Thompson&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Sophia',
    lastname: 'Perez',
    birthday: new Date('1998-12-24'),
    image: 'https://ui-avatars.com/api/?name=Sophia+Perez&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Thomas',
    lastname: 'Lewis',
    birthday: new Date('1981-05-01'),
    image: 'https://ui-avatars.com/api/?name=Thomas+Lewis&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Uma',
    lastname: 'Allen',
    birthday: new Date('1990-02-16'),
    image: 'https://ui-avatars.com/api/?name=Uma+Allen&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Victor',
    lastname: 'Young',
    birthday: new Date('1987-07-29'),
    image: 'https://ui-avatars.com/api/?name=Victor+Young&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Wendy',
    lastname: 'King',
    birthday: new Date('1994-03-06'),
    image: 'https://ui-avatars.com/api/?name=Wendy+King&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Xavier',
    lastname: 'Wright',
    birthday: new Date('1983-11-13'),
    image: 'https://ui-avatars.com/api/?name=Xavier+Wright&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Yara',
    lastname: 'Scott',
    birthday: new Date('1992-09-20'),
    image: 'https://ui-avatars.com/api/?name=Yara+Scott&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Jack',
    lastname: 'Wilson',
    birthday: new Date('1989-08-19'),
    image: 'https://ui-avatars.com/api/?name=Jack+Wilson&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Katherine',
    lastname: 'Martinez',
    birthday: new Date('1993-10-08'),
    image: 'https://ui-avatars.com/api/?name=Katherine+Martinez&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Liam',
    lastname: 'Anderson',
    birthday: new Date('1986-01-14'),
    image: 'https://ui-avatars.com/api/?name=Liam+Anderson&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Mia',
    lastname: 'Thomas',
    birthday: new Date('1996-06-21'),
    image: 'https://ui-avatars.com/api/?name=Mia+Thomas&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Noah',
    lastname: 'Jackson',
    birthday: new Date('1984-09-30'),
    image: 'https://ui-avatars.com/api/?name=Noah+Jackson&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Olivia',
    lastname: 'White',
    birthday: new Date('1997-07-07'),
    image: 'https://ui-avatars.com/api/?name=Olivia+White&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Peter',
    lastname: 'Harris',
    birthday: new Date('1982-03-17'),
    image: 'https://ui-avatars.com/api/?name=Peter+Harris&background=random&size=200',
    updatedAt: new Date()
  },
  {
    name: 'Quinn',
    lastname: 'Martin',
    birthday: new Date('1999-11-02'),
    image: 'https://ui-avatars.com/api/?name=Quinn+Martin&background=random&size=200',
    updatedAt: new Date()
  },
]

async function main() {
  for (const u of MemberData) {
    const member = await prisma.member.create({
      data: u,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect()
  })