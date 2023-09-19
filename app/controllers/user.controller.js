const { MongoClient, ObjectId } = require('mongodb');

const userName = "FIT4002";
const password = "monashFIT4002";

const uri = "mongodb+srv://" + userName + ":" + password + "@fit4002-team04.ep77oco.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.addDomain = async (req, res) => {
  const userIdString = req.userId;
  const domainName = req.body.domainName;
  const userId = new ObjectId(userIdString);

  if (!domainName) {
    return res.status(400).send({ message: "Domain name is required." });
  }

  try {
    await client.connect();

    // Define the query for the user want to update
    const query = { _id: userId };

    // Define the update statement
    const update = {
      $addToSet: { userDomains: { "domainName": domainName } }
    };

    // Update the user
    const result = await client.db("fit4002-project")
      .collection("users")
      .updateOne(query, update);

    // Check if a document was modified
    if (result.modifiedCount === 0) {
      throw new Error("User not found or domain already exists for user.");
    }

    res.status(200).send({ message: "Domain added to user successfully." });

  } catch (error) {
    res.status(500).send({ message: "There was a problem adding the domain: " + error.message });
  }
}


exports.deleteDomain = async (req, res) => {
  const userIdString = req.userId;
  const domainName = req.body.domainName;
  const userId = new ObjectId(userIdString);

  if (!domainName) {
    return res.status(400).send({ message: "Domain name is required." });
  }

  try {
    await client.connect();

    // Define the query for the user you want to update
    const query = { _id: userId };

    // Define the update statement to remove the domain from the user's array
    const update = {
      $pull: { userDomains: { "domainName": domainName } }
    };

    // Update the user's document
    const result = await client.db("fit4002-project")
      .collection("users")
      .updateOne(query, update);

    // Check if a document was modified
    if (result.modifiedCount === 0) {
      throw new Error("User not found or domain doesn't exist for user.");
    }

    res.status(200).send({ message: "Domain removed from user successfully." });

  } catch (error) {
    res.status(500).send({ message: "There was a problem deleting the domain: " + error.message });
  }
}



exports.getUserDomains = async (req, res) => {
  const userIdString = req.userId;
  const userId = new ObjectId(userIdString);

  try {
    await client.connect();

    // Fetch the user and retrieve only the userDomains field
    const user = await client.db("fit4002-project")
      .collection("users")
      .findOne({ _id: userId }, { projection: { userDomains: 1, _id: 0 } });

    if (!user) {
      throw new Error("User not found.");
    }

    res.status(200).send(user.userDomains);

  } catch (error) {
    res.status(500).send({ message: "There was a problem fetching user domains: " + error.message });
  }
}



exports.addInternalFactor = async (req, res) => {
  const userIdString = req.userId;
  const factorName = req.body.factorName;
  const userId = new ObjectId(userIdString);

  if (!factorName) {
    return res.status(400).send({ message: "Internal human factor name is required." });
  }

  try {
    await client.connect();

    // Define the query for the user want to update
    const query = { _id: userId };

    // Define the update statement
    const update = {
      $addToSet: { userInternalFactors: { "factorName": factorName } }
    };

    // Update the user
    const result = await client.db("fit4002-project")
      .collection("users")
      .updateOne(query, update);

    // Check if a document was modified
    if (result.modifiedCount === 0) {
      throw new Error("User not found or Factor already exists for user.");
    }

    res.status(200).send({ message: "Factor added to user successfully." });

  } catch (error) {
    res.status(500).send({ message: "There was a problem adding the factor: " + error.message });
  }
}

exports.deleteInternalFactor = async (req, res) => {
  const userIdString = req.userId;
  const factorName = req.body.factorName;
  const userId = new ObjectId(userIdString);
  if (!factorName) {
    return res.status(400).send({ message: "Internal human factor name is required." });
  }

  try {
    await client.connect();

    // Define the query for the user you want to update
    const query = { _id: userId };

    // Define the update statement
    const update = {
      $pull: { userInternalFactors: { "factorName": factorName } }
    };

    // Update the user
    const result = await client.db("fit4002-project")
      .collection("users")
      .updateOne(query, update);

    // Check if a document was modified
    if (result.modifiedCount === 0) {
      throw new Error("User not found or Factor doesn't exist for user.");
    }

    res.status(200).send({ message: "Factor removed from user successfully." });

  } catch (error) {
    res.status(500).send({ message: "There was a problem removing the factor: " + error.message });
  }
}


exports.getInternalFactors = async (req, res) => {
  const userIdString = req.userId;
  const userId = new ObjectId(userIdString);

  try {
    await client.connect();
    // Fetch the user and retrieve only the userInternalFactors field
    const user = await client.db("fit4002-project")
      .collection("users")
      .findOne({ _id: userId }, { projection: { userInternalFactors: 1, _id: 0 } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (!user.userInternalFactors) {
      return res.status(404).send({ message: "User internal human factors not found." });
    }

    res.status(200).send(user.userInternalFactors);

  } catch (error) {
    res.status(500).send({ message: "There was a problem fetching internal human factors: " + error.message });
  }

}



exports.addExternalFactor = async (req, res) => {
  const userIdString = req.userId;
  const factorName = req.body.factorName;
  const userId = new ObjectId(userIdString);

  if (!factorName) {
    return res.status(400).send({ message: "external human factor name is required." });
  }

  try {
    await client.connect();

    // Define the query for the user want to update
    const query = { _id: userId };

    // Define the update statement
    const update = {
      $addToSet: { userExternalFactors: { "factorName": factorName } }
    };

    // Update the user
    const result = await client.db("fit4002-project")
      .collection("users")
      .updateOne(query, update);

    // Check if a document was modified
    if (result.modifiedCount === 0) {
      throw new Error("User not found or external human factor already exists for user.");
    }

    res.status(200).send({ message: "External human factor added to user successfully." });

  } catch (error) {
    res.status(500).send({ message: "There was a problem adding the external human factor: " + error.message });
  }
}

exports.deleteExternalFactor = async (req, res) => {
  const userIdString = req.userId;
  const factorName = req.body.factorName;
  const userId = new ObjectId(userIdString);

  if (!factorName) {
    return res.status(400).send({ message: "External human factor name is required." });
  }

  try {
    await client.connect();

    // Define the query for the user you want to update
    const query = { _id: userId };

    // Define the update statement
    const update = {
      $pull: { userExternalFactors: { "factorName": factorName } }
    };

    // Update the user
    const result = await client.db("fit4002-project")
      .collection("users")
      .updateOne(query, update);

    // Check if a document was modified
    if (result.modifiedCount === 0) {
      throw new Error("User not found or external human factor doesn't exist for user.");
    }

    res.status(200).send({ message: "External human factor removed from user successfully." });

  } catch (error) {
    res.status(500).send({ message: "There was a problem removing the external human factor: " + error.message });
  }
}



exports.getExternalFactors = async (req, res) => {
  const userIdString = req.userId;
  const userId = new ObjectId(userIdString);

  try {
    await client.connect();
    // Fetch the user and retrieve only the userExternalFactors field
    const user = await client.db("fit4002-project")
      .collection("users")
      .findOne({ _id: userId }, { projection: { userExternalFactors: 1, _id: 0 } });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    if (!user.userExternalFactors) {
      return res.status(404).send({ message: "User external human factors not found." });
    }

    res.status(200).send(user.userExternalFactors);

  } catch (error) {
    res.status(500).send({ message: "There was a problem fetching external human factors: " + error.message });
  }

}


exports.getUsersPersona = async (req, res) => {
  try {
    const userIdString = req.userId;
    const userId = new ObjectId(userIdString);
    const personas = await Persona.find({ user: userId }).populate('user').exec();

    if (!personas.length) {
      return res.status(404).json({ message: "No personas found for the specified user." });
    }

    res.json(personas);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving personas.", error: error.message });
  }
};


