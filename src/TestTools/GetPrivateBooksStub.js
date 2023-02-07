export default function GetPrivateBooksStub() {
  return {
    success: true,
    result: [
      {
        bookId: 1041,
        name: "Wind in the willows",
        ownerId: "pete@logicroom.co",
        author: "Kenneth Graeme",
      },
      {
        bookId: 1051,
        name: "I, Robot",
        ownerId: "pete@logicroom.co",
        author: "Isaac Asimov",
      },
      {
        bookId: 1061,
        name: "The Hobbit",
        ownerId: "pete@logicroom.co",
        author: "Jrr Tolkein",
      },
    ],
  };
}
