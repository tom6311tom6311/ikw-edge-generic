import { User, Site, Op, SiteStatus, SiteValidationStatus } from "../src/generated/graphql";

type MockData = {
  users: {
    [key: string]: User;
  }
  userCredentials: {
    [key: string]: string;
  }
  sites: {
    [key: string]: Site;
  },
  ops: {
    [key: number]: Op;
  }
};

const users = {
  'info@afilgroup.com': {
    email: 'info@afilgroup.com',
    nameEng: 'AFIL',
    nameChin: 'AFIL',
  },
};

const userCredentials = {
  'info@afilgroup.com': 'lalala',
};


const mockData: MockData = {
  users,
  userCredentials,
  sites: {
    BangladeshNo1: {
      siteId: 'BangladeshNo1',
      status: SiteStatus.Active,
      nameEng: 'AFIL',
      nameChin: 'AFIL',
      licenseNum: 'ABCDE1234567890',
      numSiras: 0,
      area: 0,
      capacity: 0,
      speciesList: [],
      validationStatus: SiteValidationStatus.Passed,
      centralDevice: {
        deviceId: '5859564',
        opIds: [1, 3, 4],
      },
      ponds: [
        {
          administrativeNumber: 'ABCDE1234567890',
          serialNumber: 'ABCDE1234567890',
          landSerialNumber: 'ABCDE1234567890',
          area: 99.9,
          typeCode: '1234567890',
        },
      ],
      owner: users['info@afilgroup.com'],
      addressEng: 'Akij Chamber ,(7th floor) 73, Dilkusha C/A Dhaka-1000. Bangladesh',
      addressChin: 'Akij Chamber ,(7th floor) 73, Dilkusha C/A Dhaka-1000. Bangladesh',
      telCompany: 'NA',
      telMobile: 'NA',
      telHouse: 'NA',
      companyNameEng: 'AFIL',
      companyNameChin: 'AFIL',
      email: 'info@afilgroup.com',
      county: 'NA',
      district: 'NA',
      organization: '',
      numEmployees: 0,
      awardRecordList: ['NA'],
      trademark: 'NA',
      note: '',
    },
    // A123456789: {
    //   siteId: 'A123456789',
    //   status: SiteStatus.Active,
    //   nameEng: 'I Know Water Tech. Ltd,Co.',
    //   nameChin: '愛諾華特科技股份有限公司',
    //   licenseNum: 'ABCDE1234567890',
    //   numSiras: 30,
    //   area: 99.9,
    //   capacity: 99999,
    //   speciesList: ['赤鰭笛鯛', '黑毛', '斑點石鯛', '吳郭魚'],
    //   validationStatus: SiteValidationStatus.Passed,
    //   ponds: [
    //     {
    //       administrativeNumber: 'ABCDE1234567890',
    //       serialNumber: 'ABCDE1234567890',
    //       landSerialNumber: 'ABCDE1234567890',
    //       area: 99.9,
    //       typeCode: '1234567890',
    //     },
    //   ],
    //   ownerNameEng: 'Ming Wang',
    //   ownerNameChin: '王大明',
    //   addressEng: '7F., No. 89, Sec. 4, Chongxin Rd., Sanchong Dist., New Taipei City 241012 , Taiwan (R.O.C.)',
    //   addressChin: '新北市三重區重新路四段89號7樓',
    //   telCompany: '+886289725569',
    //   telMobile: '+886987897255',
    //   telHouse: '+886289725569',
    //   companyNameEng: 'I Know Water Tech. Ltd,Co.',
    //   companyNameChin: '愛諾華特科技股份有限公司',
    //   email: 'service@iknowwater.com',
    //   county: '雲林縣',
    //   district: '口湖鄉',
    //   organization: '',
    //   numEmployees: 20,
    //   awardRecordList: ['2021漁產金質獎', '2020環境友善獎'],
    //   trademark: '夜蝦食堂',
    //   note: '',
    // },
    // A223456789: {
    //   siteId: 'A223456789',
    //   status: SiteStatus.Active,
    //   nameEng: 'I Know Water Tech. Ltd,Co.',
    //   nameChin: '愛諾華特科技股份有限公司',
    //   licenseNum: 'ABCDE1234567890',
    //   numSiras: 30,
    //   area: 99.9,
    //   capacity: 99999,
    //   speciesList: ['赤鰭笛鯛', '黑毛', '斑點石鯛', '吳郭魚'],
    //   validationStatus: SiteValidationStatus.Passed,
    //   ponds: [
    //     {
    //       administrativeNumber: 'ABCDE1234567890',
    //       serialNumber: 'ABCDE1234567890',
    //       landSerialNumber: 'ABCDE1234567890',
    //       area: 99.9,
    //       typeCode: '1234567890',
    //     },
    //   ],
    //   ownerNameEng: 'Ming Wang',
    //   ownerNameChin: '王大明',
    //   addressEng: '7F., No. 89, Sec. 4, Chongxin Rd., Sanchong Dist., New Taipei City 241012 , Taiwan (R.O.C.)',
    //   addressChin: '新北市三重區重新路四段89號7樓',
    //   telCompany: '+886289725569',
    //   telMobile: '+886987897255',
    //   telHouse: '+886289725569',
    //   companyNameEng: 'I Know Water Tech. Ltd,Co.',
    //   companyNameChin: '愛諾華特科技股份有限公司',
    //   email: 'service@iknowwater.com',
    //   county: '雲林縣',
    //   district: '口湖鄉',
    //   organization: '',
    //   numEmployees: 20,
    //   awardRecordList: ['2021漁產金質獎', '2020環境友善獎'],
    //   trademark: '夜蝦食堂',
    //   note: '',
    // },
  },
  ops: {
    1: {
      opId: 1,
      name: "水溫",
      unit: "℃",
      sensorName: "DS18B20",
      defaultWarningThreshold: {
        low: 10,
        high: 20,
      },
    },
    2: {
      opId: 2,
      name: "TDS",
      unit: "ppm",
      sensorName: "",
      defaultWarningThreshold: {
        high: 500,
      },
    },
    3: {
      opId: 3,
      name: "pH",
      unit: "",
      sensorName: "Nerset PH",
      defaultWarningThreshold: {
        low: 6,
        high: 8,
      },
    },
    4: {
      opId: 4,
      name: "ORP",
      unit: "mV",
      sensorName: "ORP",
      defaultWarningThreshold: {
        low: -700,
        high: 800,
      },
    },
    5: {
      opId: 5,
      name: "原電池型溶氧",
      unit: "ppm",
      sensorName: "Galvanic Dissolved Oxygen",
      defaultWarningThreshold: {
        low: 1,
        high: 6,
      },
    },
    10: {
      opId: 10,
      name: "電流偵測1",
      unit: "A",
      sensorName: "15A/1V CT",
      defaultWarningThreshold: {},
    },
    11: {
      opId: 11,
      name: "電流偵測2",
      unit: "A",
      sensorName: "15A/1V CT",
      defaultWarningThreshold: {},
    },
    12: {
      opId: 12,
      name: "電流偵測3",
      unit: "A",
      sensorName: "15A/1V CT",
      defaultWarningThreshold: {},
    },
    13: {
      opId: 13,
      name: "電流偵測4",
      unit: "A",
      sensorName: "15A/1V CT",
      defaultWarningThreshold: {},
    },
    14: {
      opId: 14,
      name: "電流偵測5",
      unit: "A",
      sensorName: "15A/1V CT",
      defaultWarningThreshold: {},
    },
    15: {
      opId: 15,
      name: "電流偵測6",
      unit: "A",
      sensorName: "15A/1V CT",
      defaultWarningThreshold: {},
    },
    16: {
      opId: 16,
      name: "電流偵測7",
      unit: "A",
      sensorName: "15A/1V CT",
      defaultWarningThreshold: {},
    },
    17: {
      opId: 17,
      name: "電流偵測8",
      unit: "A",
      sensorName: "15A/1V CT",
      defaultWarningThreshold: {},
    },
    18: {
      opId: 18,
      name: "氣壓",
      unit: "hPa",
      sensorName: "BME280",
      defaultWarningThreshold: {
        low: 1000,
        high: 1100,
      },
    },
    19: {
      opId: 19,
      name: "風速",
      unit: "m/s",
      sensorName: "氣象站配套風速計",
      defaultWarningThreshold: {
        high: 7,
      },
    },
    20: {
      opId: 20,
      name: "風向",
      unit: "",
      sensorName: "氣象站配套風向計",
      defaultWarningThreshold: {},
    },
    21: {
      opId: 21,
      name: "雨量",
      unit: "mm",
      sensorName: "氣象站配套雨量計",
      defaultWarningThreshold: {
        high: 50,
      },
    },
    41: {
      opId: 41,
      name: "空氣濕度",
      unit: "%",
      sensorName: "DHT11",
      defaultWarningThreshold: {
        low: 30,
      },
    },
    64: {
      opId: 64,
      name: "氣溫",
      unit: "℃",
      sensorName: "DHT11",
      defaultWarningThreshold: {
        low: 15,
        high: 30,
      },
    },
    67: {
      opId: 67,
      name: "土壤濕度",
      unit: "%",
      sensorName: "電容式土壤濕度帶線Epoxy防水",
      defaultWarningThreshold: {
        low: 25,
      },
    },
    68: {
      opId: 68,
      name: "土壤溫度",
      unit: "℃",
      sensorName: "DS18B20",
      defaultWarningThreshold: {
        low: 15,
        high: 30,
      },
    },
    69: {
      opId: 69,
      name: "光亮度",
      unit: "Lux",
      sensorName: "MAX44009",
      defaultWarningThreshold: {},
    },
    79: {
      opId: 79,
      name: "超音波魚浮頭",
      unit: "",
      sensorName: "SR04",
      defaultWarningThreshold: {},
    },
    84: {
      opId: 84,
      name: "CO2",
      unit: "ppm",
      sensorName: "",
      defaultWarningThreshold: {
        low: 22,
        high: 32,
      },
    },
    85: {
      opId: 85,
      name: "NOx",
      unit: "ppm",
      sensorName: "",
      defaultWarningThreshold: {
        low: -30,
        high: 30,
      },
    },
    86: {
      opId: 86,
      name: "NH3",
      unit: "ppm",
      sensorName: "",
      defaultWarningThreshold: {
        high: 2,
      },
    },
    87: {
      opId: 87,
      name: "TVOC",
      unit: "ppm",
      sensorName: "",
      defaultWarningThreshold: {
        high: 0.1,
      },
    },
    88: {
      opId: 88,
      name: "水流量",
      unit: "l/min",
      sensorName: "YF-DN50",
      defaultWarningThreshold: {
        high: 1,
      },
    },
    89: {
      opId: 89,
      name: "太陽能電壓",
      unit: "mV",
      sensorName: "",
      defaultWarningThreshold: {},
    },
    90: {
      opId: 90,
      name: "飼料量",
      unit: "%",
      sensorName: "SR04",
      defaultWarningThreshold: {
        low: 30
      },
    },
    91: {
      opId: 91,
      name: "噴料桶震動馬達偵測",
      unit: "A",
      sensorName: "10A/1V CT",
      defaultWarningThreshold: {},
    },
    92: {
      opId: 92,
      name: "噴料桶鼓風機偵測",
      unit: "A",
      sensorName: "10A/1V CT",
      defaultWarningThreshold: {},
    },
  },
};

export default mockData;
