import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const matches = [
  {
    date: new Date('2024-03-22T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-23T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Delhi Capitals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-23T10:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-24T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-24T10:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-25T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Delhi Capitals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-26T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Gujarat Titans',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-27T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-28T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-29T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-30T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-31T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-03-31T10:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-01T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-02T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Gujarat Titans',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-03T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Delhi Capitals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-04T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-05T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-06T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-07T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-07T10:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-08T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-09T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-10T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Gujarat Titans',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-11T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-12T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-13T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-14T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-14T10:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-15T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-16T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-17T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-18T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Delhi Capitals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-19T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-20T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-20T10:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-21T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-22T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-23T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-24T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-25T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-26T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-27T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-27T10:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-28T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-29T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-04-30T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Delhi Capitals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-01T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-02T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-03T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-04T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Gujarat Titans',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-04T10:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-05T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-06T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-07T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Delhi Capitals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-08T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-09T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-10T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-11T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Delhi Capitals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-11T10:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-12T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-13T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-14T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-15T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Gujarat Titans',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-16T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-17T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-18T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-18T10:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-19T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-20T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-21T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-22T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-23T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-24T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-25T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-25T10:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-26T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-27T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-28T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Gujarat Titans',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-29T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-30T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-05-31T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-01T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-02T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-03T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-04T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-05T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-06T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-07T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-08T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-08T10:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-09T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-10T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-11T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Gujarat Titans',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-12T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-13T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-14T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-15T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-16T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-17T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-18T14:00:00Z'),
    venue: 'Punjab Cricket Association IS Bindra Stadium, Mohali',
    homeTeam: 'Punjab Kings',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-19T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-20T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-21T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-22T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Chennai Super Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-22T10:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Lucknow Super Giants',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-23T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-24T14:00:00Z'),
    venue: 'Sawai Mansingh Stadium, Jaipur',
    homeTeam: 'Rajasthan Royals',
    awayTeam: 'Punjab Kings',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-25T14:00:00Z'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    homeTeam: 'Sunrisers Hyderabad',
    awayTeam: 'Gujarat Titans',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-26T14:00:00Z'),
    venue: 'Eden Gardens, Kolkata',
    homeTeam: 'Kolkata Knight Riders',
    awayTeam: 'Mumbai Indians',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-27T14:00:00Z'),
    venue: 'M Chinnaswamy Stadium, Bengaluru',
    homeTeam: 'Royal Challengers Bengaluru',
    awayTeam: 'Sunrisers Hyderabad',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-28T14:00:00Z'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    homeTeam: 'Gujarat Titans',
    awayTeam: 'Kolkata Knight Riders',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-29T14:00:00Z'),
    venue: 'Arun Jaitley Stadium, Delhi',
    homeTeam: 'Delhi Capitals',
    awayTeam: 'Rajasthan Royals',
    status: 'UPCOMING'
  },
  {
    date: new Date('2024-06-30T14:00:00Z'),
    venue: 'MA Chidambaram Stadium, Chennai',
    homeTeam: 'Chennai Super Kings',
    awayTeam: 'Royal Challengers Bengaluru',
    status: 'UPCOMING'
  }
];

async function main() {
  try {
    // First, get all teams
    const teams = await prisma.team.findMany();
    const teamMap = new Map(teams.map(team => [team.name, team.id]));

    // Delete all existing matches
    await prisma.match.deleteMany();

    // Create new matches
    for (const match of matches) {
      const homeTeamId = teamMap.get(match.homeTeam);
      const awayTeamId = teamMap.get(match.awayTeam);

      if (!homeTeamId || !awayTeamId) {
        console.error(`Team not found: ${match.homeTeam} or ${match.awayTeam}`);
        continue;
      }

      await prisma.match.create({
        data: {
          date: match.date,
          venue: match.venue,
          homeTeamId,
          awayTeamId,
          status: match.status
        }
      });
    }

    console.log('Successfully updated matches');
  } catch (error) {
    console.error('Error updating matches:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 