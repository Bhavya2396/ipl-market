# IPL 2025 Predictions Market - Rules & Guidelines

## Overview
The IPL 2025 Predictions Market allows users to make predictions on various aspects of IPL 2025 matches. Users can earn points based on the accuracy of their predictions, which contribute to their overall ranking on the leaderboard.

## Match Schedule
- Total Matches: 74
- Season Duration: March-May 2025
- Format: Round Robin + Playoffs
- Teams: 10 (All existing IPL teams)

## Prediction Markets & Points

### 1. Match Winner (1 point)
- **Description**: Predict the winning team of the match
- **Timing**: Available until match start
- **Options**: Both teams playing in the match
- **Points**: 1 point for correct prediction
- **Resolution**: Based on final match result

### 2. Highest Run Scorer (2 points)
- **Description**: Predict the player who will score the most runs in the match
- **Timing**: Available until match start
- **Options**: Players from both teams' playing XI
- **Points**: 2 points for correct prediction
- **Resolution**: Based on final batting statistics
- **Tiebreaker**: In case of a tie, points are shared equally

### 3. Highest Wicket Taker (2 points)
- **Description**: Predict the bowler who will take the most wickets in the match
- **Timing**: Available until match start
- **Options**: Players from both teams' playing XI
- **Points**: 2 points for correct prediction
- **Resolution**: Based on final bowling statistics
- **Tiebreaker**: In case of a tie, points are shared equally

### 4. 200 Runs Barrier (1 point)
- **Description**: Predict if either team will score 200 or more runs
- **Timing**: Available until match start
- **Options**: Yes/No
- **Points**: 1 point for correct prediction
- **Resolution**: Based on highest team score in the match

## Rules & Guidelines

### General Rules
1. Predictions must be made before the match starts
2. Once a match begins, no new predictions can be made
3. Users can only make one prediction per market per match
4. Points are awarded only for correct predictions
5. No points are deducted for incorrect predictions

### Market Availability
1. Markets open 24 hours before match start
2. Markets close at match start time
3. Results are updated within 24 hours of match completion

### Points Calculation
1. Match Winner: 1 point
2. Highest Run Scorer: 2 points
3. Highest Wicket Taker: 2 points
4. 200 Runs Barrier: 1 point

### Leaderboard
1. Points are cumulative across all matches
2. Leaderboard is updated daily
3. Ties are resolved by:
   - Total number of correct predictions
   - Success rate (correct predictions / total predictions)
   - Time of first prediction

### Data Sources
1. Match Schedule: Official IPL website
2. Team Squads: Official team announcements
3. Match Results: Official match reports
4. Player Statistics: Official match statistics

### Resolution Process
1. Match Results:
   - Updated within 24 hours of match completion
   - Verified against official sources
   - Includes full scorecard and statistics

2. Prediction Resolution:
   - Automated where possible
   - Manual verification for complex scenarios
   - Appeals process for disputed results

### User Guidelines
1. Users must be registered to make predictions
2. One account per user
3. Predictions cannot be modified after submission
4. Users can view their prediction history
5. Leaderboard position updates daily

## Technical Implementation

### Database Schema
1. Matches
   - Match details
   - Teams
   - Venue
   - Date/Time
   - Status

2. Markets
   - Market type
   - Options
   - Status
   - Resolution criteria

3. Predictions
   - User
   - Market
   - Selected option
   - Points earned
   - Status

4. Results
   - Match statistics
   - Player performance
   - Market resolution

### API Endpoints
1. Match Management
   - GET /api/matches
   - GET /api/matches/[id]
   - GET /api/matches/upcoming

2. Market Management
   - GET /api/markets
   - GET /api/markets/match/[id]
   - GET /api/markets/active

3. Prediction Management
   - POST /api/predictions
   - GET /api/predictions/user/[id]
   - GET /api/predictions/match/[id]

4. Leaderboard
   - GET /api/leaderboard
   - GET /api/leaderboard/user/[id]

## Maintenance & Updates
1. Daily data synchronization
2. Weekly leaderboard updates
3. Monthly performance reports
4. Quarterly system maintenance

## Support & Contact
For any queries or issues:
- Email: support@iplmarket.com
- Help Center: help.iplmarket.com
- Twitter: @IPLMarket 