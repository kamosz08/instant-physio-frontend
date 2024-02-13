## Instant Physio pet project client

Same for both: Here will be app description same of client and BE, demo link, GIF? POtential future

Idea for this project is to create a platform, which allows users to train from home with chosen personal coach.
If we have technology where we can use AI to create such personal coaches, this platform could be used.
That being said this is just a pet project to try out some technologies and patterns.

At current stage user can browse through coaches with use of filters. He can get more credits (for free, payments aren't implemented) and use those credits to book a meeting with chosen coach at chosen time. He can browse though his sessions and cancel them.

On client side sing up and coach/admin version of app was not implemented. On backend side api allows to create account and to manage them by admin. All coaches has been seeded using AI generated images with stable diffusion.

TODO: GIF / DEMO

Potential for future:
- Sing up and coach/admin version of app on client side
- Handle training sessions -> chat and video calls between coach and client
- Payments

## How to run

`npm run dev`

## Tech stack

Database:
- MySQL
- Redis

TODO: DATABASE SCHEMA/link

Backend:
- Typescript
- Express
- Knex

Frontend
- Typescript
- Next.js
- Tailwind with DaisyUI


## Deployment

I have tried both standalone and managed Vercel deployment options.

Deploy in EC2:
Warning: Using t2.micro instance it was lacking resources to deploy both backend and frontend on single instance.
1. Make sure you can SSH into EC2 instance
2. Copy code to EC2 instance: 
`rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next' --exclude '.env' -e "ssh -i PATH_KEY.pem" . USER@IP_INSTANCE:~/webapp`
3. Setup .env file
4. Run `npm run build`
5. Run `npm run start` (use pm2 or something similar to make sure app is always running in background)

Deploy in Vercel:

## Conclusions
Same for both

- Overall architecture of this project was obviously overkill. The easiest way to deliver such result would be to just use some managed DB and write API in Next.js

- Client: Using DIP from "Clean Architecture" and creating domain-logic seems like a scalable good solution. For this project it was a bit overkill, but now if we wanted to create for example mobile app we can export both domain-logic and backendApi as separate packages. Domain logic is the highest level and other packages (backendApi, frontend, mobile) would depend on it. Frontend and mobile packages would also depend on backendAPI.

- Backend: Feature based folder structure like one used in NestJS would make better developer experience than the one I have used here. At very small scale it becomes unoptimal to jump between folders. When we add new route we care about things related to this route so it makes sense to colocate them.

- Backend: Using knex instead of full ORM makes it easy to step down to pure SQL queries and still it can provide us some typesafety

- Backend: SQL vs NoSQL - this project didn't have any vision, sql database is not very flexible so it took some migrations. That being said I still think this use case fits SQL

- Correct approach for JWT tokens storage is to store acces_token in memory and refresh_token in safe cookie. This way we are protected from XSS and CSRF. [Best way to store JWT tokens](https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id)