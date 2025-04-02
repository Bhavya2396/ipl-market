# IPL 2025 Predictions Market - Rules & Guidelines

## Overview
The IPL 2025 Predictions Market allows users to make predictions on various aspects of IPL 2025 matches. Users can earn points based on the accuracy of their predictions, which contribute to their overall ranking on the leaderboard.

## Authentication
- Google OAuth for account creation and login
- No wallet integration required
- No monetary transactions involved

## Match Schedule
- Total Matches: 74
- Season Duration: March-May 2025
- Format: Round Robin + Playoffs
- Teams: 10 (All existing IPL teams)

## Prediction Markets & Points

### 1. Match Winner (1 point)
- **Description**: Predict the winning team of the match
- **Timing**: Available until 1 hour before match start
- **Options**: Both teams playing in the match
- **Points**: 1 point for correct prediction
- **Resolution**: Based on final match result
- **Special Cases**: No points awarded for abandoned/cancelled matches

### 2. Highest Run Scorer (2 points)
- **Description**: Predict the player who will score the most runs in the match
- **Timing**: Available until 1 hour before match start
- **Options**: Players from both teams' playing XI
- **Points**: 2 points for correct prediction
- **Resolution**: Based on final batting statistics
- **Tiebreaker**: In case of a tie, points are shared equally
- **Special Cases**: No points if match is abandoned before completion

### 3. Highest Wicket Taker (2 points)
- **Description**: Predict the bowler who will take the most wickets in the match
- **Timing**: Available until 1 hour before match start
- **Options**: Players from both teams' playing XI
- **Points**: 2 points for correct prediction
- **Resolution**: Based on final bowling statistics
- **Tiebreaker**: In case of a tie, points are shared equally
- **Special Cases**: No points if match is abandoned before completion

### 4. 200 Runs Barrier (1 point)
- **Description**: Predict if either team will score 200 or more runs
- **Timing**: Available until 1 hour before match start
- **Options**: Yes/No
- **Points**: 1 point for correct prediction
- **Resolution**: Based on highest team score in the match
- **Special Cases**: No points if match is abandoned before completion

## Rules & Guidelines

### General Rules
1. All predictions must be made before 1 hour of match start time
2. Users can only view and make predictions for matches scheduled for the current day
3. Users can make one prediction per market per match
4. Points are awarded only for correct predictions
5. No points are deducted for incorrect predictions
6. Users must be logged in with Google to make predictions
7. Predictions cannot be modified after submission

### Market Availability
1. Markets are only visible for matches scheduled for the current day
2. Markets close automatically 1 hour before match start time
3. Results are updated within 30 minutes of match completion
4. Markets may be cancelled in case of match abandonment

### Points System
1. Total points per match: Up to 6 points
   - Match Winner: 1 point
   - Highest Run Scorer: 2 points
   - Highest Wicket Taker: 2 points
   - 200 Runs Barrier: 1 point
2. Points are credited within 1 hour of market resolution

### Leaderboard System
1. Global Rankings
   - Based on total points accumulated
   - Updated in real-time after each market resolution
   - Tiebreaker: Higher success rate

2. Time-based Rankings
   - Daily leaderboard
   - Weekly leaderboard
   - Monthly leaderboard
   - Season leaderboard

### User Statistics
1. Total Points
2. Success Rate
3. Prediction History
4. Market-wise Performance
5. Recent Activity

## Technical Implementation

### Market States
1. UPCOMING
   - Market is open for predictions
   - All options available
   - Users can submit predictions

2. CLOSED
   - Market closed 1 hour before match
   - Existing predictions locked
   - No new predictions allowed

3. RESOLVED
   - Results calculated
   - Points distributed
   - Available for review

4. CANCELLED
   - Market invalidated
   - No points awarded
   - Users notified

### Resolution Process
1. Automatic Resolution
   - Match results processed automatically
   - Points calculated based on official statistics
   - Results verified before finalization

2. Manual Resolution (if needed)
   - Admin review for special cases
   - Verification of complex scenarios
   - Final decision binding

### Error Handling
1. Match Cancellation
   - All markets cancelled
   - Users notified
   - No points deducted

2. Player Unavailability
   - Player-specific markets cancelled
   - Alternative markets may be offered
   - Users notified of changes

3. Technical Issues
   - Grace period for system errors
   - Support ticket system
   - Fair resolution policy

## Support & Contact
For any queries or issues:
- Email: support@iplmarket.com
- Help Center: help.iplmarket.com
- Twitter: @IPLMarket

## Updates & Changes
- Rules may be updated for clarity or fairness
- Users will be notified of significant changes
- All updates will be documented and timestamped 