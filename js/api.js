const base_url = "https://api.football-data.org/v2/";
const tokenApi = '5a67970529a9484aa75645361d96b67f';
 
const fetchAPI = (url) => fetch(url, {
    headers: {
      'X-Auth-Token': tokenApi,
    },
})

const images = document.querySelectorAll('img');
images.forEach((img) => {
    img.addEventListener('error', () => {
        img.src = '../images/logo72.png';
    });
});

// Kode dibawah untuk menangkap respon
function status(response) {
    if (response.status !== 200) {
        console.log(`Error ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
 
// kode dibawah untuk memparsing json menjadi object javascript
function json(response) {
    return response.json();
}
 
// kode dibawah digunakan untuk meng-handle kesalahan respon
function error(error) {
    console.log(`Error : ${error}`);
}

function showTeams(data) {
    // let teamsHTML = ""
    const teamsHTML = document.getElementById('mobileTeams');
    let loadingpage = document.getElementsByClassName('loading-page')[0].style.display = 'none';


        data.teams.forEach((team) => {
            let clubImage = team.crestUrl;        
                if (clubImage !== null) {            
                clubImage = team.crestUrl.replace(/^http:\/\//i, 'https://');        
                }
            teamsHTML.innerHTML += `
                <tr>
                    <td>
                        <img src="${clubImage}" alt="${team.name}" class="responsive-image image-table">
                    </td>
                    <td>
                         <h5>${team.name}</h5>
                    </td>
                    <td>${team.area.name}</td>
                    <td>
                        <a href="./details.html?id=${team.id}" class="waves-effect btn-detail-team waves-light blue-darken-3 btn">More</a>
                    </td>
                </tr>
            `;
        });
           
}
 
// =================================================================================================================
// Menampilkan Detail Teams
function showDetailTeams(data) {
    let loadingpage = document.getElementsByClassName('loading-page')[0].style.display = 'none';
    let clubImage = data.crestUrl;        
                if (clubImage !== null) {            
                clubImage = data.crestUrl.replace(/^http:\/\//i, 'https://');        
                }
    let detailsHTML = `
                    <div class="center-align">
                            <div class="col s12 m6 l6">
                                <div class="card-image">
                                    <img src="${clubImage}" class="responsive-image" alt="${data.name}" >
                                </div>
                            </div>
                        
                        <div class="card"> 
                            <div class="col s12 m12 l6">
                                <table class="centered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Address</th>
                                            <th>Venue</th>
                                            <th>Club Color</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${data.name}</td>
                                            <td>${data.address}</td>
                                            <td>${data.venue}</td>
                                            <td>${data.clubColors}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="center-align">
                        <div class="listMatch"> 
                            <h3>Info Team</h3>
                        </div>  
                        <div class="row">
                            <div class="col s12 m6 l6">
                                <h4>Info Matches</h4>
                                <div class="team-squad"> 
                                    <table class="centered highlight responsive-table" border="1">
                                        <thead>
                                            <tr>
                                                <th>Home Team</th>
                                                <th>Score</th>
                                                <th>Away Team</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody id="activeCompetition">
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col s12 m6 l6">
                                <h4>Info Squad</h4>
                                <div class="team-squad"> 
                                    <table class="centered responsive-table highlight responsive-table" border="1">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Role</th>
                                                <th>Nationality</th>
                                            </tr>
                                        </thead>
                                        <tbody id="squadTeam">
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
                  // Sisipkan komponen card ke dalam elemen dengan id #content
                  document.getElementById("content").innerHTML = detailsHTML;
                  SaveTeams(data);
}
 
 
    async function SaveTeams(data) {
        const button = document.getElementById('btn-save');
 
        if(await getById(data.id)) {
            button.innerHTML = "delete";
        }
 
        button.addEventListener('click', async () =>{
            if(await getById(data.id)) {
                deleteClub();
                button.innerHTML = "save";
                console.log('Click Delete');
            } else {
                saveForLater(data);
                button.innerHTML = "delete";
                console.log()
            }
        })
    }
// ======================================================================================================== 
 
// Menampilkan Match Teams
function showMatchTeams(data) {
    const teamsHTML = document.getElementById("activeCompetition");
                        data.matches.forEach((team) => {
                            teamsHTML.innerHTML += `
                            <tr>
                                <td>
                                    ${team.homeTeam.name}
                                </td>
                                <td>
                                    ${team.score.fullTime.homeTeam} - ${team.score.fullTime.awayTeam}
                                </td>
                                <td>
                                    ${team.awayTeam.name}
                                </td>
                                <td>
                                    ${team.status}
                                    <br>
                                    ${team.utcDate}
                                </td>
                            </tr>
                            `;
                        });
}
 
// Menampilkan Squad Teams
function showSquadTeams(data) {
        const squadHTML = document.getElementById("squadTeam");
        data.squad.forEach((player) => {
            squadHTML.innerHTML +=`
                <tr>
                    <td>${player.name}</td>
                    <td>${player.position}</td>
                    <td>${player.role}</td>
                    <td>${player.nationality}</td>
                </tr>
            `;
        })
}
 
// Menampilkan Match EPL
function showMatchEPL(data) {
    let matchHTML = "";
    let loadingpage = document.getElementsByClassName('loading-page')[0].style.display = 'none';
    data.matches.forEach((match) => {
        let dateTime = new Date(match.utcDate);
        date = dateTime.toLocaleDateString();
        time = dateTime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        matchHTML += `
            <tr>
                <td>${match.homeTeam.name}<a href="./details.html?id=${match.homeTeam.id}"> Info</a></td>
                <td>${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam} </td>
                <td>${match.awayTeam.name}<a href="./details.html?id=${match.awayTeam.id}"> Info</a></td>
                <td><span>${date}</span><br><span>${time}</span></td>
            </tr>
        `;
    });
    document.getElementById("matchesEPL").innerHTML = matchHTML;
}
 
// Ambil data Team liga mobile version
function getTeamsMobile() {
    return new Promise( (resolve,reject) => {

    if ('caches' in window) {
        caches.match(`${base_url}competitions/2021/teams/`).then((response) => {
          if (response) {
            response.json().then((data) => {
                showTeams(data);
                resolve(data);
            });
          }
        });
      }
    
      fetchAPI(`${base_url}competitions/2021/teams/`)
      .then(status)
          .then(json)
          .then( (data) => {
              showTeams(data);
              resolve(data);
          });
    })
}
 
// ==============================================================================
// Ambil Data Detail Team
function getTeamDetails() {
 
    return new Promise(function(resolve, reject) {
        let urlParam = new URLSearchParams(window.location.search);
        let idParam = urlParam.get("id");
 
        if ("caches" in window) {
            caches.match(`${base_url}teams/${idParam}`).then((response) => {
                if (response) {
                response.json()
                .then( (data) => {
                    showDetailTeams(data);
                    resolve(data);
                });
              }
            });
          }
 
        fetchAPI(`${base_url}teams/${idParam}`)
        .then(status)
        .then(json)
        .then( (data) => {
            showDetailTeams(data);
            resolve(data);
        });
    })
    .then(getActiveCompetition)
    .then(getSquadTeam);
}
 
// mengambil data competisi untuk detail team
function getActiveCompetition() {

        let urlParam = new URLSearchParams(window.location.search);
        let idParam = urlParam.get("id");
 
        if ("caches" in window) {
            caches.match(`${base_url}teams/${idParam}/matches/`)
            .then(function(response) {
                if (response) {
                    response.json()
                    .then( (data) => {
                        showMatchTeams(data);
                    });
                    
                }
            })
        }
 
        fetchAPI(`${base_url}teams/${idParam}/matches/`)
        .then(status)
        .then(json)
        .then( (data) => {
            showMatchTeams(data);
        });

}
 
// Ambil Data Squad Team
function getSquadTeam() {
    
        let urlParam = new URLSearchParams(window.location.search);
        let idParam = urlParam.get("id");
 
        if ("caches" in window) {
            caches.match(`${base_url}teams/${idParam}`)
            .then(function(response) {
                if (response) {
                    response.json()
                    .then( (data) => {
                        showSquadTeams(data);
                    });
                    
                }
            })
        }
 
        fetchAPI(`${base_url}teams/${idParam}`)
        .then(status)
        .then(json)
        .then( (data) => {
            showSquadTeams(data);
        });

    
}
 
// ==============================================================================
// Ambil data Matches Liga Inggris
function getMatchsEPL() {
 
    return new Promise((resolve, reject) => {
    
        if ("caches" in window) {
            caches.match(`${base_url}competitions/2021/matches/`)
            .then((response) => {
                if (response) {
                    response.json()
                    .then( (data) => {
                        showMatchEPL(data);
                        resolve(data);
                    });
                }
            })
        }
 
        fetchAPI(`${base_url}competitions/2021/matches/`)
        .then(status)
        .then(json)
        .then( (data) => {
            showMatchEPL(data);
            resolve(data);
        });
 
    })
}
 
// Ambil data yang sudah disimpan
function getSavedTeams() {
    getAll().then((team) => {
        console.log(team);
 
        // menyusun component card secara dinamis
        let teamsHTML = "";
        if (team.length === 0) {
            teamsHTML = `
                <tr>
                    <td colspan="4"> TIDAK ADA TEAM TERSIMPAN </td>
                </tr>
            `;
        } else {
        team.forEach((data) => {
                    teamsHTML += `
                        <tr>
                            <td>
                                <img src="${data.crestUrl}" alt="icon" class="responsive-image image-table">
                            </td>
                            <td>
                                <h5>${data.name}</h5>
                            </td>
                            <td>${data.area.name}</td>
                            <td>
                                <a href="./details.html?id=${data.id}&saved=true" class="waves-effect btn-detail-team waves-light blue-darken-3 btn">More</a>
                            </td>
                        </tr>
                `;
                
        });
        }
        document.getElementById("mobileTeams").innerHTML = teamsHTML;
    });
}
 
function getSavedDetailsTeams() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    
    getById(idParam)
    .then((data) => {
        showDetailTeams(data);
    })
    .then(getActiveCompetition)
    .then(getSquadTeam);
}