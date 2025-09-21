import { useEffect, useState } from "react";
import image2 from "./assets/sleep_futon_smartphone_woman.png";
import ProfileItem from "./components/ProfileItem";
import {
  ToggleButton,
  ToggleButtonGroup,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import dayjs from "dayjs";

type Header = {
  profile: string;
  name: string;
  birthday: string;
  birthplace: string;
  motto: string;
  hobbies: string;
  skill: string;
  highlight: string;
  message: string;
};

type ProfileData = {
  name: string;
  birthday: string;
  birthplace: string;
  motto: string;
  hobbies: string;
  skill: string;
  highlight: string;
  message: string;
  age: number;
  yearWithCompany: string;
};

const theme = createTheme({
  palette: {
    mode: "light", // force light mode
    background: {
      default: "#ffffff",
    },
  },
});

function App() {
  const JP = "JP";
  const EN = "EN";
  const [language, setLanguage] = useState<string>(JP);

  const [profileData, setProfileData] = useState<ProfileData | null>();
  const [headers, setHeaders] = useState<Header | null>();

  const switchLang = async (lang: string) => {
    const res = await fetch(`http://localhost:3000/user${lang}`);
    const data = await res.json();
    const birthday = dayjs(data.birthday).format("YYYY.MM.DD");
    const age = dayjs().diff(data.birthday, "year");
    const yearWithCompany = dayjs().diff(data.date_of_joining_company, "year");
    setProfileData({ ...data, birthday, age, yearWithCompany });

    const res2 = await fetch(`http://localhost:3000/header${lang}`);
    const data2 = await res2.json();
    setHeaders(data2);
  };

  useEffect(() => {
    (async () => {
      switchLang(language);
    })().finally();
  }, [language]);

  if (!profileData) {
    return <p>Loading...</p>;
  }

  const changeLanguage = (
    _event: React.MouseEvent<HTMLElement>,
    newLang: string
  ) => {
    setLanguage(newLang);
  };

  const returnBirthdayInfo = (
    birthday?: string,
    age?: number,
    companyYear?: string
  ) => {
    if (language === JP) {
      return `${birthday} (${age}歳、入社${companyYear}年目)`;
    } else {
      return `${profileData?.birthday} (${profileData?.age} years old, ${profileData?.yearWithCompany} year with company)`;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
          marginLeft: 40,
        }}
      >
        <h1 className="main-title mx-auto mt-5">{headers?.profile}</h1>
        <div className="ml-auto">
          <ToggleButtonGroup
            value={language}
            exclusive
            onChange={changeLanguage}
            aria-label="language"
          >
            <ToggleButton defaultChecked value={JP}>
              <span className="fi fi-jp"></span> {JP}
            </ToggleButton>
            <ToggleButton value={EN}>
              <span className="fi fi-nz"></span> {EN}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="profile-card">
        <div className="main-grid">
          <div className="row-span-2">
            <img src={image2} />
          </div>
          <div className="main-item">
            <ProfileItem title={headers?.name} content={profileData?.name} />
          </div>
          <div className="main-item">
            <ProfileItem
              title={headers?.birthday}
              content={returnBirthdayInfo(
                profileData?.birthday,
                profileData?.age,
                profileData?.yearWithCompany
              )}
            />
          </div>
          <div className="main-item">
            <ProfileItem
              title={headers?.birthplace}
              content={profileData?.birthplace}
            />
          </div>
          <div className="main-item">
            <ProfileItem title={headers?.motto} content={profileData?.motto} />
          </div>
          <div className="main-item">
            <ProfileItem
              title={headers?.hobbies}
              content={profileData?.hobbies}
            />
          </div>
          <div className="main-item">
            <ProfileItem title={headers?.skill} content={profileData?.skill} />
          </div>
          <div></div>
          <div className="main-item">
            <ProfileItem
              title={headers?.highlight}
              content={profileData?.highlight}
            />
          </div>
          <div className="col-span-2 main-item">
            <ProfileItem
              title={headers?.message}
              content={profileData?.message}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
