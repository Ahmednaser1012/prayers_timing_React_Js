import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Prayer from "./Prayer";
import axios from "axios";
import moment from "moment";
// import "moment/dist/locale/ar";
// moment.locale("ar");

export default function Main() {
  const getTimings = async () => {
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity/13-11-2024?country=eg&city=${selectedCity.apiName}`
    );
    setTimings(response.data.data.timings);
  };
  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهره مصر",
    apiName: "Cairo Egypt",
  });
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Maghrib: "18:03",
    Isha: "19:33",
  });

  const avilableCities = [
    {
      displayName: "القاهره مصر",
      apiName: "Cairo Egypt",
    },
    {
      displayName: "مكة المكرمة",
      apiName: "Makkah al Mukarramah",
    },
    {
      displayName: "الرياض",
      apiName: "Riyadh",
    },
  ];

  const [today, setToday] = useState("");

  const handleCityChange = (event) => {
    const cityObject = avilableCities.find((city) => {
      return city.apiName === event.target.value;
    });
    console.log("the new value is ", event.target.value);
    setSelectedCity(cityObject);
  };

  /// *************************
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);

  const [remainingTime, setRemainingTime] = useState("");
  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  useEffect(() => {
    let interval = setInterval(() => {
      console.log("calling timer");
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));
    // setToday(t.format("LLLL"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    const momentNow = moment();
    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }
    // console.log(remainingTime);

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );

    // console.log(
    //   "duration issss ",
    //   durationRemainingTime.hours(),
    //   durationRemainingTime.minutes(),
    //   durationRemainingTime.seconds()
    // );
  };

  return (
    <div>
      {/* TOP ROW */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{today}</h2>
            {/* <h1>مصر القاهره</h1> */}
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      {/*== TOP ROW ==*/}
      <Divider
        style={{
          borderColor: "white",
          opacity: "0.1",
          width: "95%",
          // marginBottom: "3%",
        }}
      />
      {/* PRAYERS CARDS */}
      {/* <Stack
        direction="row"
        justifyContent={"space-evenly"}
        style={{ marginTop: "30px" }}
      >
        <Prayer
          name="الفجر"
          time={timings.Fajr}
          image="https://th.bing.com/th/id/OIP.jfg5TypKc-EyGp7g-G4ZBAHaEJ?rs=1&pid=ImgDetMain"
        />
        <Prayer
          name="الظهر"
          time={timings.Dhuhr}
          image="https://th.bing.com/th/id/OIP.QTwHK1HwsGdVG5qx9_4wYgHaHa?rs=1&pid=ImgDetMain"
        />
        <Prayer
          name="العصر"
          time={timings.Asr}
          image="https://pbs.twimg.com/media/D2GnMspXQAEsGBP.jpg"
        />
        <Prayer
          name="المغرب"
          time={timings.Maghrib}
          image="https://mediaaws.almasryalyoum.com/news/large/2024/03/10/2342846_0.jpg"
        />
        <Prayer
          name="العشاء"
          time={timings.Isha}
          image="https://mir-s3-cdn-cf.behance.net/projects/404/2a6db7101078733.Y3JvcCw2MjgsNDkxLDAsOTM.jpg"
        />
      </Stack> */}
      <div className="container text-center">
        <div className="row g-4 ">
          <div className="col-lg-6 col-sm-12">
            <Prayer
              name="الفجر"
              time={timings.Fajr}
              image="https://th.bing.com/th/id/OIP.jfg5TypKc-EyGp7g-G4ZBAHaEJ?rs=1&pid=ImgDetMain"
            />
          </div>
          <div
            className="col-lg-5 col-sm-12 "
            style={{
              marginBottom: "5%",
            }}
          >
            <Prayer
              name="الظهر"
              time={timings.Dhuhr}
              image="https://th.bing.com/th/id/OIP.QTwHK1HwsGdVG5qx9_4wYgHaHa?rs=1&pid=ImgDetMain"
            />
          </div>
        </div>
        <div className="row g-4">
          <div className="col-sm">
            <Prayer
              name="العصر"
              time={timings.Asr}
              image="https://pbs.twimg.com/media/D2GnMspXQAEsGBP.jpg "
            />
          </div>
          <div className="col-sm">
            {" "}
            <Prayer
              name="المغرب"
              time={timings.Maghrib}
              image="https://mediaaws.almasryalyoum.com/news/large/2024/03/10/2342846_0.jpg"
            />
          </div>
          <div className="col-sm">
            <Prayer
              name="العشاء"
              time={timings.Isha}
              image="https://mir-s3-cdn-cf.behance.net/projects/404/2a6db7101078733.Y3JvcCw2MjgsNDkxLDAsOTM.jpg"
            />
          </div>
        </div>
        {/*== PRAYERS CARDS ==*/}
        {/* SELECT CITY */}
        <div className="row g-3">
          <div className="col-sm-12">
            <FormControl
              style={{
                marginTop: "15%",
                marginBottom: "10%",
                width: "80%",
                backgroundColor: "rgba(201, 151, 71, 0.87)",
              }}
            >
              <InputLabel id="demo-simple-select-label">
                <span style={{ color: "white" }}>المدينة</span>
              </InputLabel>
              <Select
                style={{ color: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                onChange={handleCityChange}
              >
                {avilableCities.map((city) => {
                  return (
                    <MenuItem value={city.apiName} key={city.apiName}>
                      {city.displayName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>

      {/*== PRAYERS CARDS ==*/}
      {/* SELECT CITY */}
      {/* <Stack
        direction="row"
        justifyContent={"center"}
       
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleCityChange}
          >
            {avilableCities.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack> */}
    </div>
  );
}
