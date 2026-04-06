import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";
import { api } from "../../contexts/DataContext";
import { DataProvider } from "../../contexts/DataContext";

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
  focus: [
        {
            "title": "World economic forum",
            "description": "Oeuvre à la coopération entre le secteur public et le privé.",
            "date": "2022-01-29T20:28:45.744Z",
            "cover": "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png"
        },
        {
            "title": "Nordic design week",
            "description": "Conférences sur le design de demain dans le digital",
            "date": "2022-03-29T20:28:45.744Z",
            "cover": "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png"
        },
        {
            "title": "Sneakercraze market",
            "description": "Rencontres de spécialistes des Sneakers Européens.",
            "date": "2022-05-29T20:28:45.744Z",
            "cover": "/images/jakob-dalbjorn-cuKJre3nyYc-unsplash 1.png"
        }
    ]
};

  
beforeEach(() => {
  api.loadData = jest.fn().mockReturnValue(fakeData)
})

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(
      <DataProvider>
      <Home />
      </DataProvider>
    );
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(
        <DataProvider>
      <Home />
      </DataProvider>
      );
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    const eventsContainer = screen.getByRole("heading", {name: "Nos réalisations"});
    const eventCard = eventsContainer.closest(".EventsContainer")
    const event1 =  await within(eventCard).findByText("User&product MixUsers");
    const event2 = within(eventCard).getByText("#DigitonPARIS");
    const event3 = within(eventCard).getByText("Conférence &co-responsable");

    expect(eventsContainer).toBeInTheDocument();
    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
    expect(event3).toBeInTheDocument();
  })
  it("a list a people is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    const peopleContainer = screen.getByRole("heading", {name: "Notre équipe"});
    const name1 = screen.getByText("Samira");
    const function1 = screen.getByText("CEO");
    const name2 = screen.getByText("Jean-baptiste");
    const function2 = screen.getByText("Directeur marketing");
    const name3 = screen.getByText("Alice");
    const function3 = screen.getByText("CXO");
    const name4 = screen.getByText("Luís");
    const function4 = screen.getByText("Animateur");
    const name5 = screen.getByText("Christine");
    const function5 = screen.getByText("VP animation");
    const name6 = screen.getByText("Isabelle");
    const function6 = screen.getByText("VP communication");

    expect(peopleContainer).toBeInTheDocument();
    expect(name1).toBeInTheDocument();
    expect(function1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(function2).toBeInTheDocument();
    expect(name3).toBeInTheDocument();
    expect(function3).toBeInTheDocument();
    expect(name4).toBeInTheDocument();
    expect(function4).toBeInTheDocument();
    expect(name5).toBeInTheDocument();
    expect(function5).toBeInTheDocument();
    expect(name6).toBeInTheDocument();
    expect(function6).toBeInTheDocument();
  })
  it("a footer is displayed", async () => {
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    const footerTitle = await screen.findByText("Notre derniére prestation");
    const contactTitle = screen.getByText("Contactez-nous");
    const contactAdress = screen.getByText("45 avenue de la République, 75000 Paris");
    const contactPhone = screen.getByText("01 23 45 67 89");
    const contactMail = screen.getByText("contact@724events.com");
    const description = screen.getByText("Une agence événementielle propose des prestations de service", { exact: false});
  
    expect (footerTitle).toBeInTheDocument();
    expect (contactTitle).toBeInTheDocument();
    expect (contactAdress).toBeInTheDocument();
    expect (contactPhone).toBeInTheDocument();
    expect (contactMail).toBeInTheDocument();
    expect (description).toBeInTheDocument();
  })

  it("an event card, with the last event, is displayed with date, cover, title and the tag", async () => {
   
    render(
      <DataProvider>
      <Home />
      </DataProvider>
    );
    const footerTitle = await screen.findByText("Notre derniére prestation");
    const card = footerTitle.closest(".presta");
    const title = await within(card).findByText("User&product MixUsers");
    const cover = within(card).getByTestId("card-image-testid");
    const date = within(card).getByText("avril");
    const label = within(card).getByText("boom");

    expect(footerTitle).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(cover.getAttribute("src")).toBe("/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png")
  })
});
