<template>
    <div id="kolegiji">
        <div class="logo-naslov">
            <b-img left v-bind="props" rounded="circle" :src="fipu" alt="FIPU"></b-img>
            <h2 class="item">{{ naslov }}</h2>
            <b-img right v-bind="props" :src="sveucilisteLogo" alt="Logo"></b-img>
        </div>
        <b-form-select :options="kolegijiSelect" v-model="odabraniKolegij" style="margin-top: 8%; width: 30%"></b-form-select>
        <div v-if="odabrani" class="prikaz">
            <div class="obavijest">
                <p>Prije nego sto zapocnete ocjenjivanje vaseg profesora, morate upisati lozinku kolegija. Profesor ce zapisati lozinku na plocu, kada ju upisete mozete zapoceti s ocjenjivanjem.</p>
            </div>
            <b-form>
                <b-form-group id="group-1" label="Unesite lozinku kolegija">
                    <b-form-input type="password" v-model="upisanaLozinka" placeholder="Lozinka..." style="width: 30%; margin: 0 auto"></b-form-input>
                </b-form-group>
            </b-form>
            <b-button @click="potvrdaLozinke" variant="success">Potvrdi</b-button>
        </div>
        <div v-if="lozinka" class="prikaz odabir-a">
            <h3>Profesor/i:</h3>
            <ol>
                <li v-for="(prof, index) in predmetniProf" :key="index">
                    <router-link :to="{name: 'anketa', params: {prof, odabraniKolegij}}"><i>{{prof.Ime}} {{prof.Prezime}}</i></router-link>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Kolegiji",
        data () {
            return {
                naslov: "Odabir kolegija",
                props: {width: 80, height: 80, class: 'item'},

                kolegiji: [],
                kolegijiSelect: [],
                odabraniKolegij: '',

                lozinkaKolegija: '',
                upisanaLozinka: '',
                odabrani: false,
                lozinka: false,

                profesori: [],
                predmetniProf: []
            }
        },
        created(){
            this.dohvatiKolegije();
            this.dohvatiProf();
        },
        watch: {
          odabraniKolegij(){

              this.sortirajProf();
              this.odabrani = true;
          }
        },
        methods: {
            async dohvatiProf(){
                await axios.get("http://127.0.0.1:5000/profesori")
                    .then((res) => {
                        this.profesori = res.data.profesori[0];
                    })
                    .catch((error) => {
                        console.log("Ne mogu dohvatiti profesore. Error: ", error);
                    })
            },
            async dohvatiKolegije(){
                await axios.get("http://127.0.0.1:5000/kolegiji")
                    .then((res) => {
                        res.data.kolegiji.forEach(function(value){
                            this.kolegijiSelect.push({value: value.id, text: value.naziv});
                        }, this);
                        this.kolegiji = res.data.kolegiji;
                    })
                    .catch((error) => {
                        console.log("Ne mogu dohvatiti kolegije. Error: ", error);
                    })
            },
            sortirajProf(){
                this.kolegiji.forEach(function(value){          // Vrtimo kolegije kroz petlju
                    if(value.id === this.odabraniKolegij){      // Usporeduje id kolegija (value.id) s id-jem odabranog kolegija (odabraniKolegij). Ako je isti ulazi u blok
                        this.predmetniProf = value.profesori;   // U varijablu, odnosno listu predmetniProf sprema profesore koji predaju taj kolegij
                        this.lozinkaKolegija = value.lozinka;   // U varijablu lozinkaKolegija sprema lozinku kolegija
                    }
                }, this);
                // IZBACIO SAM ONU DRUGU forEach PETLJU JER JE BILA VISAK. NASAO SAM JEDNOSTAVNIJI NACIN KAD JE TUNTI SREDIO BAZU
            },
            potvrdaLozinke(){
                if(this.upisanaLozinka === this.lozinkaKolegija){   // Prije je "lozinkaKolegija" bila namjestena da je za svaki kolegij '123' lozinka, a sada uzima lozinku od svakog kolegija posebno. Linija 91
                    this.odabrani = false;                          // Skriva upis lozinke
                    this.lozinka = true;                            // Pokazuje profesore koji predaju odabrani kolegij
                } else {
                    alert("Kriva lozinka. Pokusajte ponovno!");
                }
            }
        },
        computed: {
            fipu () {
                return require('../assets/FIPU.png');
            },
            sveucilisteLogo () {
                return require('../assets/SveucilisteJUrjaDobrilePulaLogo.png');
            },
        }
    }
</script>

<style>
    #kolegiji{
        width: 85%;
        height: 800px;
        max-height: 800px;
        margin: 5% auto;
        background-image: linear-gradient(whitesmoke, lightblue, whitesmoke) ;
        position: relative;
    }
    .logo-naslov{
        width: 100%;
        padding: 1% 2% 0 2%;
    }
    .item{
        display: inline-block;
    }
    .obavijest{
        height: 100px;
        width: 50%;
        margin: 5% auto 1.5% auto;
        padding-top: 1.5%;
        background-color: lightgray;
        font-size: medium;
        border-radius: 10px;
    }
    .prikaz{
        transition: .5s ease;
    }
    .odabir-a{
        text-align: justify;
        padding-top: 2.5%;
        padding-left: 4%;
    }
    .odabir-a ol li{
        margin-left: 8%;
    }
</style>