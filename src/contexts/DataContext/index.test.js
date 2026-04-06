import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

const fakeData = {
  events: [
    {
      "id": 1,
      "type": "conférence",
      "date": "2022-04-29T20:28:45.744Z",
      "title": "User&product MixUsers",
      "cover": "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
      "description": "Présentation des nouveaux usages UX.",
      "nb_guesses": 900,
      "periode": "14-15-16 Avril",
      "prestations": [
        "1 espace d’exposition",
        "1 scéne principale",
        "1 espace de restaurations"
      ]
    },
    {
      "id": 2,
      "type": "expérience digitale",
      "date": "2022-01-29T20:28:45.744Z",
      "title": "#DigitonPARIS",
      "cover": "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur ",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
        "1 espace d’exposition",
        "1 scéne principale",
        "1 site web dédié"
      ]
    },
    {
      "id": 3,
      "type": "conférence",
      "date": "2022-03-29T20:28:45.744Z",
      "title": "Conférence &co-responsable",
      "cover": "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
      "description": "Débats et échanges autour des collaborations eco-responsable.",
      "nb_guesses": 600,
      "periode": "24-25-26 Février",
      "prestations": [
        "1 scéne principale",
        "1 espaces de restaurations",
        "1 site web dédié"
      ]
    },
  ],
};

describe("When a data context is created", () => {
  it("a call is executed on the events.json file", async () => {
    api.loadData = jest.fn().mockReturnValue({ result: "ok" });
    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });
  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockRejectedValue("error on calling events");

      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };
      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );
      const dataDisplayed = await screen.findByText("error on calling events");
      expect(dataDisplayed).toBeInTheDocument();
    });
  });
  it("api.loadData", () => {
    window.console.error = jest.fn();
    global.fetch = jest.fn().mockResolvedValue(() =>
      Promise.resolve({
        json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
      })
    );
    const Component = () => {
      const { error } = useData();
      return <div>{error}</div>;
    };
    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );
  });
  describe("last unit test suites", () => {
    describe("check last return something", () => {
      it("last is not null", async () => {

        api.loadData = jest.fn().mockReturnValue(fakeData);

        const Component = () => {
          const { last } = useData();
          const hasLast = !!last;
          return <span>{String(hasLast)}</span>;
        };

        render(
          <DataProvider>
            <Component />
          </DataProvider>
        );

        const result = await screen.findByText("true");
        expect(result).toBeInTheDocument();
      });
      it("check last return a title, cover and date", async () => {
        api.loadData = jest.fn().mockReturnValue(fakeData);

        const Component = () => {
          const { last } = useData();

          return (
            <>
              <span>{last?.title}</span>
              <span>{last?.cover}</span>
              <span>{last?.date}</span>
            </>
          );
        };

        render(
          <DataProvider>
            <Component />
          </DataProvider>
        );

        const title = await screen.findByText("User&product MixUsers");
        const cover = await screen.findByText("/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png");
        const date = await screen.findByText("2022-04-29T20:28:45.744Z");

        expect(title).toBeInTheDocument();
        expect(cover).toBeInTheDocument();
        expect(date).toBeInTheDocument();
      });
      it("check last return the most recent event", async () => {
        api.loadData = jest.fn().mockReturnValue(fakeData);

        const Component = () => {
          const { last } = useData();

          return (
            <>
              <span>{last?.id}</span>
            </>
          );
        };
        render(
          <DataProvider>
            <Component />
          </DataProvider>
        );

        const id = await screen.findByText("1")
        expect(id.tex).toBe("1");
      });
    });

  });

});
