class Contact {
    name: string;
    email: string;
    phone: string;
  
    constructor(name: string, email: string, phone: string) {
      this.name = name;
      this.email = email;
      this.phone = phone;
    }
  }
  
  class AddressBook {
    contacts: Contact[] = [];
  
    addContact(contact: Contact): void {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact.email)) {
        throw new Error("Invalid email format");
      }
  
      if (!contact.name || contact.name.trim() === "") {
        throw new Error("Name cannot be empty");
      }
  
      this.contacts.push(contact);
    }
  
    findContactByName(name: string): Contact | undefined {
      return this.contacts.find((contact) => contact.name === name);
    }
  
    sortByName(): void {
      this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  
    searchContacts(searchTerm: string): Contact[] {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      return this.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedSearchTerm)
      );
    }
  
    printContacts(): void {
      for (const contact of this.contacts) {
        console.log(`Name: ${contact.name}`);
        console.log(`Email: ${contact.email}`);
        console.log(`Phone: ${contact.phone}`);
        console.log("-----");
      }
    }
  }
  
  const addressBook = new AddressBook();
  const contact1 = new Contact("John Doe", "johndoe@example.com", "123-456-7890");
  const contact2 = new Contact("Alice Smith", "alice.smith@invalid", "456-789-0123");
  const contact3 = new Contact("", "valid@email.com", "789-012-3456");
  
  addressBook.addContact(contact1);
  
  try {
    addressBook.addContact(contact2);
    addressBook.addContact(contact3);
  } catch (error: any) {
    console.error("Error adding contact:", error.message);
  }
  
  console.log("Contacts:");
  addressBook.printContacts();
  
  const searchResults = addressBook.searchContacts("john");
  console.log("Search results (name containing 'john'):");
  searchResults.forEach((contact) => console.log(`  - ${contact.name}`));