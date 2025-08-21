import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaMapMarkerAlt, FaUser, FaChartLine, FaClock, FaBolt } from 'react-icons/fa';
import { GiCricketBat, GiTennisBall } from 'react-icons/gi';
import { MdSportsCricket } from 'react-icons/md';
import './CricketMatchDetail.css';

const CricketMatchDetail = ({ matchId, onBack }) => {
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('live');
  const [selectedInnings] = useState(0);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced with comprehensive cricket data
        const cricketDetails = {
          sport: 'cricket',
          homeTeam: 'Mumbai Indians',
          awayTeam: 'Chennai Super Kings',
          homeScore: '178/6',
          awayScore: '165/8',
          homeOvers: '20.0',
          awayOvers: '20.0',
          status: 'live',
          result: 'Mumbai Indians won by 13 runs',
          currentInnings: 2,
          currentOver: 15.3,
          currentBall: 3,
          requiredRunRate: 12.5,
          currentRunRate: 8.9,
          matchType: 'T20',
          series: 'IPL 2024',
          venue: 'Wankhede Stadium, Mumbai',
          date: '2024-04-15',
          time: '19:30 IST',
          currentBatsmen: [
            { 
              name: 'Rohit Sharma', 
              runs: 68, 
              balls: 42, 
              fours: 8, 
              sixes: 2, 
              strikeRate: 161.90,
              isStriker: true,
              isOut: false,
              dismissalType: null,
              dismissalBowler: null,
              dismissalFielder: null
            },
            { 
              name: 'Ishan Kishan', 
              runs: 23, 
              balls: 18, 
              fours: 2, 
              sixes: 1, 
              strikeRate: 127.78,
              isStriker: false,
              isOut: false,
              dismissalType: null,
              dismissalBowler: null,
              dismissalFielder: null
            }
          ],
          currentBowler: {
            name: 'Deepak Chahar',
            overs: '3.2',
            maidens: 0,
            runs: 28,
            wickets: 2,
            economy: 8.40,
            extras: 2,
            dots: 8
          },
          ballByBall: [
            {
              over: 15,
              ball: 1,
              runs: 4,
              ballType: 'FOUR',
              batsman: 'Rohit Sharma',
              bowler: 'Deepak Chahar',
              commentary: 'Beautiful cover drive! Rohit finds the gap perfectly.',
              isWicket: false,
              isExtra: false,
              extraType: null,
              wicketType: null,
              dismissalBatsman: null
            },
            {
              over: 15,
              ball: 2,
              runs: 1,
              ballType: 'SINGLE',
              batsman: 'Rohit Sharma',
              bowler: 'Deepak Chahar',
              commentary: 'Quick single taken, good running between the wickets.',
              isWicket: false,
              isExtra: false,
              extraType: null,
              wicketType: null,
              dismissalBatsman: null
            },
            {
              over: 15,
              ball: 3,
              runs: 0,
              ballType: 'DOT',
              batsman: 'Ishan Kishan',
              bowler: 'Deepak Chahar',
              commentary: 'Defended solidly, no run.',
              isWicket: false,
              isExtra: false,
              extraType: null,
              wicketType: null,
              dismissalBatsman: null
            },
            {
              over: 15,
              ball: 4,
              runs: 6,
              ballType: 'SIX',
              batsman: 'Ishan Kishan',
              bowler: 'Deepak Chahar',
              commentary: 'MASSIVE SIX! Ishan clears the boundary with ease!',
              isWicket: false,
              isExtra: false,
              extraType: null,
              wicketType: null,
              dismissalBatsman: null
            },
            {
              over: 15,
              ball: 5,
              runs: 0,
              ballType: 'WICKET',
              batsman: 'Ishan Kishan',
              bowler: 'Deepak Chahar',
              commentary: 'OUT! Caught behind! Ishan edges it to the keeper.',
              isWicket: true,
              isExtra: false,
              extraType: null,
              wicketType: 'caught',
              dismissalBatsman: 'Ishan Kishan'
            },
            {
              over: 15,
              ball: 6,
              runs: 1,
              ballType: 'SINGLE',
              batsman: 'Rohit Sharma',
              bowler: 'Deepak Chahar',
              commentary: 'Single to keep the strike.',
              isWicket: false,
              isExtra: false,
              extraType: null,
              wicketType: null,
              dismissalBatsman: null
            }
          ],
          recentOvers: [
            { over: 15, balls: ['4', '1', '0', '6', 'W', '1'], runs: 12, wickets: 1 },
            { over: 14, balls: ['1', '4', '2', '1', '1', '6'], runs: 15, wickets: 0 },
            { over: 13, balls: ['2', '1', '1', '4', '1', '1'], runs: 10, wickets: 0 },
            { over: 12, balls: ['W', '1', '2', '1', '4', '1'], runs: 9, wickets: 1 },
            { over: 11, balls: ['1', '1', '6', '2', '1', '1'], runs: 12, wickets: 0 }
          ],
          innings: [
            {
              team: 'Mumbai Indians',
              score: '178/6',
              overs: '20.0',
              runRate: '8.90',
              topScorers: [
                { name: 'Rohit Sharma', runs: 68, balls: 42, fours: 8, sixes: 2, strikeRate: 161.90 },
                { name: 'Suryakumar Yadav', runs: 45, balls: 32, fours: 4, sixes: 2, strikeRate: 140.63 },
                { name: 'Ishan Kishan', runs: 35, balls: 28, fours: 3, sixes: 1, strikeRate: 125.00 }
              ],
              fallOfWickets: [
                { wicket: 1, score: 45, batsman: 'Quinton de Kock', overs: '5.2' },
                { wicket: 2, score: 89, batsman: 'Suryakumar Yadav', overs: '10.1' },
                { wicket: 3, score: 134, batsman: 'Ishan Kishan', overs: '15.5' }
              ],
              partnerships: [
                { pair: 'Rohit - de Kock', runs: 45, balls: 32 },
                { pair: 'Rohit - Suryakumar', runs: 44, balls: 29 },
                { pair: 'Rohit - Ishan', runs: 45, balls: 34 }
              ]
            },
            {
              team: 'Chennai Super Kings',
              score: '165/8',
              overs: '20.0',
              runRate: '8.25',
              topScorers: [
                { name: 'MS Dhoni', runs: 55, balls: 38, fours: 5, sixes: 2, strikeRate: 144.74 },
                { name: 'Ravindra Jadeja', runs: 42, balls: 31, fours: 3, sixes: 1, strikeRate: 135.48 },
                { name: 'Ruturaj Gaikwad', runs: 28, balls: 25, fours: 2, sixes: 1, strikeRate: 112.00 }
              ],
              fallOfWickets: [
                { wicket: 1, score: 23, batsman: 'Ruturaj Gaikwad', overs: '3.1' },
                { wicket: 2, score: 67, batsman: 'Ravindra Jadeja', overs: '8.4' },
                { wicket: 3, score: 152, batsman: 'MS Dhoni', overs: '18.2' }
              ],
              partnerships: [
                { pair: 'Ruturaj - Conway', runs: 23, balls: 19 },
                { pair: 'Jadeja - Conway', runs: 44, balls: 33 },
                { pair: 'Dhoni - Jadeja', runs: 85, balls: 58 }
              ]
            }
          ],
          powerplay: {
            home: { runs: 52, overs: '6.0', wickets: 1, runRate: 8.67 },
            away: { runs: 48, overs: '6.0', wickets: 2, runRate: 8.00 }
          },
          toss: 'Mumbai Indians won the toss and chose to bat first',
          weather: 'Clear skies, 28°C',
          pitch: 'Good batting surface, some assistance for spinners',
          umpires: ['Kumar Dharmasena', 'Marais Erasmus'],
          thirdUmpire: 'Chris Gaffaney',
          matchReferee: 'Javagal Srinath'
        };
        setMatchDetails(cricketDetails);
      } catch (err) {
        setError('Failed to load match details');
        console.error('Error fetching match details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [matchId]);

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading cricket match details...</p>
        </div>
      </div>
    );
  }

  if (error || !matchDetails) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            {error || 'Match not found'}
          </div>
          <button
            onClick={onBack}
            className="btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      'live': 'bg-danger text-white',
      'finished': 'bg-success text-white',
      'upcoming': 'bg-primary text-white',
      'abandoned': 'bg-secondary text-white'
    };
    return `badge ${statusClasses[status] || 'bg-secondary text-white'}`;
  };

  const getBallClass = (ball) => {
    if (ball === 'W') return 'bg-danger text-white';
    if (ball === '4') return 'bg-success text-white';
    if (ball === '6') return 'bg-warning text-dark';
    if (ball === '0') return 'bg-light text-dark';
    return 'bg-primary text-white';
  };

  const getBallTypeClass = (ballType) => {
    const typeClasses = {
      'FOUR': 'text-success fw-bold',
      'SIX': 'text-warning fw-bold',
      'WICKET': 'text-danger fw-bold',
      'SINGLE': 'text-primary',
      'TWO': 'text-info',
      'THREE': 'text-info',
      'DOT': 'text-muted',
      'WIDE': 'text-warning',
      'NO_BALL': 'text-warning'
    };
    return typeClasses[ballType] || 'text-dark';
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-white shadow-sm border-bottom sticky-top" style={{ zIndex: 1000 }}>
        <div className="container-fluid">
          <div className="row align-items-center py-2">
            <div className="col-auto">
              <button
                onClick={onBack}
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
              >
                <FaArrowLeft />
                <span>Back</span>
              </button>
            </div>
            <div className="col text-center">
              <h5 className="mb-0 fw-bold text-primary">
                <MdSportsCricket className="me-2" />
                {matchDetails.series}
              </h5>
            </div>
            <div className="col-auto">
              <span className={`${getStatusBadge(matchDetails.status)} ${matchDetails.status === 'live' ? 'status-live' : ''}`}>
                {matchDetails.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Header */}
      <div className="bg-white border-bottom">
        <div className="container-fluid py-3">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h4 className="fw-bold mb-1">{matchDetails.homeTeam} vs {matchDetails.awayTeam}</h4>
              <div className="d-flex align-items-center gap-3 text-muted small">
                <span><FaMapMarkerAlt /> {matchDetails.venue}</span>
                <span><FaClock /> {matchDetails.date} • {matchDetails.time}</span>
                <span className="badge bg-info">{matchDetails.matchType}</span>
              </div>
            </div>
            <div className="col-md-4 text-end">
              <div className="d-flex flex-column gap-1">
                <span className="text-muted small">Weather</span>
                <span className="fw-medium">{matchDetails.weather}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Score Banner */}
      {matchDetails.status === 'live' && (
        <div className="bg-danger text-white py-2 live-banner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-auto">
                <FaBolt className="me-2" />
                <span className="fw-bold">LIVE</span>
              </div>
              <div className="col text-center">
                <span className="fw-bold">
                  Over {matchDetails.currentOver} • Ball {matchDetails.currentBall}
                </span>
              </div>
              <div className="col-auto">
                <span className="badge bg-light text-dark">
                  RR: {matchDetails.currentRunRate} | RRR: {matchDetails.requiredRunRate}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Score Display */}
      <div className="bg-white border-bottom">
        <div className="container-fluid py-3">
          <div className="row g-3">
            {matchDetails.innings.map((innings, index) => (
              <div key={index} className="col-md-6">
                <div className={`card h-100 cricket-card team-score-card ${index === selectedInnings ? 'current' : ''}`}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="card-title mb-0 fw-bold">{innings.team}</h6>
                      {index === selectedInnings && (
                        <span className="badge bg-primary">Current</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        <h3 className="fw-bold text-primary mb-0">{innings.score}</h3>
                        <small className="text-muted">({innings.overs} overs)</small>
                      </div>
                      <div className="text-end">
                        <div className="fw-medium">RR: {innings.runRate}</div>
                        <small className="text-muted">Run Rate</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-bottom">
        <div className="container-fluid">
          <ul className="nav nav-tabs nav-fill">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                <FaBolt className="me-1" />
                Live
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'scorecard' ? 'active' : ''}`}
                onClick={() => setActiveTab('scorecard')}
              >
                <GiCricketBat className="me-1" />
                Scorecard
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'ballbyball' ? 'active' : ''}`}
                onClick={() => setActiveTab('ballbyball')}
              >
                <GiTennisBall className="me-1" />
                Ball by Ball
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
              >
                <FaChartLine className="me-1" />
                Statistics
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container-fluid py-3">
        {/* Live Tab */}
        {activeTab === 'live' && (
          <div className="row g-3">
            {/* Current Batsmen */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h6 className="mb-0">
                    <FaUser className="me-2" />
                    Current Batsmen
                  </h6>
                </div>
                <div className="card-body">
                  {matchDetails.currentBatsmen.map((batsman, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                      <div className="flex-grow-1">
                                                 <div className="d-flex align-items-center gap-2">
                           <h6 className={`mb-0 fw-bold ${batsman.isStriker ? 'striker-indicator' : ''}`}>{batsman.name}</h6>
                           {batsman.isStriker && (
                             <span className="badge bg-warning text-dark">Striker</span>
                           )}
                         </div>
                        <small className="text-muted">SR: {batsman.strikeRate}</small>
                      </div>
                      <div className="text-end">
                        <h5 className="mb-0 fw-bold text-primary">{batsman.runs}</h5>
                        <small className="text-muted">({batsman.balls} balls)</small>
                        <div className="small text-muted">
                          {batsman.fours}×4, {batsman.sixes}×6
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Bowler */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header bg-danger text-white">
                  <h6 className="mb-0">
                    <GiTennisBall className="me-2" />
                    Current Bowler
                  </h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="fw-bold mb-1">{matchDetails.currentBowler.name}</h6>
                      <small className="text-muted">Economy: {matchDetails.currentBowler.economy}</small>
                    </div>
                    <div className="text-end">
                      <h5 className="mb-0 fw-bold text-danger">{matchDetails.currentBowler.wickets}</h5>
                      <small className="text-muted">wickets</small>
                      <div className="small text-muted">
                        {matchDetails.currentBowler.overs} overs, {matchDetails.currentBowler.runs} runs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Overs */}
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Recent Overs</h6>
                </div>
                <div className="card-body">
                  <div className="recent-overs-grid">
                    {matchDetails.recentOvers.map((over, index) => (
                      <div key={index} className="border rounded p-2 text-center powerplay-card">
                        <div className="fw-bold text-primary mb-1">Over {over.over}</div>
                        <div className="d-flex justify-content-center gap-1 mb-1">
                          {over.balls.map((ball, ballIndex) => (
                            <span
                              key={ballIndex}
                              className={`badge ${getBallClass(ball)}`}
                              style={{ width: '24px', height: '24px', fontSize: '10px' }}
                            >
                              {ball}
                            </span>
                          ))}
                        </div>
                        <small className="text-muted">{over.runs} runs</small>
                        {over.wickets > 0 && (
                          <div className="small text-danger">{over.wickets} wicket(s)</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scorecard Tab */}
        {activeTab === 'scorecard' && (
          <div className="row g-3">
            {matchDetails.innings.map((innings, index) => (
              <div key={index} className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">{innings.team} - {innings.score} ({innings.overs} overs)</h6>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-sm mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Batsman</th>
                            <th className="text-center">R</th>
                            <th className="text-center">B</th>
                            <th className="text-center">4s</th>
                            <th className="text-center">6s</th>
                            <th className="text-center">SR</th>
                            <th>Dismissal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {innings.topScorers.map((batsman, batsmanIndex) => (
                            <tr key={batsmanIndex}>
                              <td className="fw-medium">{batsman.name}</td>
                              <td className="text-center fw-bold">{batsman.runs}</td>
                              <td className="text-center">{batsman.balls}</td>
                              <td className="text-center">{batsman.fours}</td>
                              <td className="text-center">{batsman.sixes}</td>
                              <td className="text-center">{batsman.strikeRate}</td>
                              <td className="text-muted">not out</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ball by Ball Tab */}
        {activeTab === 'ballbyball' && (
          <div className="row g-3">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Ball by Ball Commentary</h6>
                </div>
                <div className="card-body ball-by-ball-container">
                  <div className="timeline">
                    {matchDetails.ballByBall.map((ball, index) => (
                      <div key={index} className="d-flex mb-3 timeline-item">
                        <div className="flex-shrink-0 me-3">
                          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" 
                               style={{ width: '40px', height: '40px' }}>
                            <span className="fw-bold small">{ball.over}.{ball.ball}</span>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <span className={`fw-bold ${getBallTypeClass(ball.ballType)}`}>
                              {ball.ballType}
                            </span>
                            {ball.runs > 0 && (
                              <span className="badge bg-success">{ball.runs} run{ball.runs > 1 ? 's' : ''}</span>
                            )}
                            {ball.isWicket && (
                              <span className="badge bg-danger">WICKET!</span>
                            )}
                          </div>
                          <p className="mb-1 small">{ball.commentary}</p>
                          <small className="text-muted">
                            {ball.batsman} • {ball.bowler}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="row g-3">
            {/* Powerplay Stats */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Powerplay (1-6 overs)</h6>
                </div>
                <div className="card-body">
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="border rounded p-2 text-center">
                        <h6 className="text-primary mb-1">{matchDetails.homeTeam}</h6>
                        <h5 className="fw-bold mb-1">{matchDetails.powerplay.home.runs}/{matchDetails.powerplay.home.wickets}</h5>
                        <small className="text-muted">RR: {matchDetails.powerplay.home.runRate}</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-2 text-center">
                        <h6 className="text-danger mb-1">{matchDetails.awayTeam}</h6>
                        <h5 className="fw-bold mb-1">{matchDetails.powerplay.away.runs}/{matchDetails.powerplay.away.wickets}</h5>
                        <small className="text-muted">RR: {matchDetails.powerplay.away.runRate}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Info */}
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h6 className="mb-0">Match Information</h6>
                </div>
                <div className="card-body">
                  <div className="row g-2">
                    <div className="col-6">
                      <small className="text-muted">Toss</small>
                      <p className="mb-1 small">{matchDetails.toss}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Pitch</small>
                      <p className="mb-1 small">{matchDetails.pitch}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Umpires</small>
                      <p className="mb-1 small">{matchDetails.umpires.join(', ')}</p>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Third Umpire</small>
                      <p className="mb-1 small">{matchDetails.thirdUmpire}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partnerships */}
            {matchDetails.innings.map((innings, index) => (
              <div key={index} className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">{innings.team} - Partnerships</h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-sm mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Partners</th>
                            <th className="text-center">Runs</th>
                            <th className="text-center">Balls</th>
                            <th className="text-center">RR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {innings.partnerships.map((partnership, pIndex) => (
                            <tr key={pIndex}>
                              <td className="fw-medium">{partnership.pair}</td>
                              <td className="text-center fw-bold">{partnership.runs}</td>
                              <td className="text-center">{partnership.balls}</td>
                              <td className="text-center">{((partnership.runs / partnership.balls) * 6).toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default CricketMatchDetail;
