import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    disableFilters: true, //disable filter for id
    sticky: "left",
  },
  {
    Header: "First Name",
    accessor: "firstname",
    sticky: "left",
  },
  {
    Header: "Last Name",
    accessor: "lastname",
    sticky: "left",
  },
  {
    Header: "Date of Birth",
    accessor: "datebirth",
    //to format date
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Departament",
    accessor: "departament",
  },
  {
    Header: "Start Date",
    accessor: "startdate",
    //to format date
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Street",
    accessor: "street",
  },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "State",
    accessor: "countrystate",
  },
  {
    Header: "Zipcode",
    accessor: "zipcode",
  },
];

export const GROUPED_COLUMNS = [
  {
    //group header, footer and accessor
    Header: "Id",
    accessor: "id",
  },
  {
    //group name and last name
    Header: "Name",
    columns: [
      {
        Header: "First Name",
        accessor: "firstname",
      },
      {
        Header: "Last Name",
        accessor: "lastname",
      },
      {
        Header: "Date of Birth",
        accessor: "datebirth",
      },
    ],
  },
  {
    //group all others info
    Header: "Info",
    columns: [
      {
        Header: "Start Date",
        accessor: "startdate",
      },
      {
        Header: "Departament",
        accessor: "departament",
      },

      {
        Header: "Street",
        accessor: "street",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "countrystate",
      },
      {
        Header: "Zipcode",
        accessor: "zipcode",
      },
    ],
  },
];