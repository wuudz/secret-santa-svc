const handlebars = require("handlebars");
const yaml = require('js-yaml')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const k8s = require('@kubernetes/client-node');

const create = async () => {
  const config = {
    "users": [
      {
        "name": "Declan Woods",
        "mobile": "+61450124275"
      },
      {
        "name": "Nick Woods",
        "mobile": "+61411500440"
      },
      {
        "name": "Jenn Woods",
        "mobile": "+61416090231"
      },
      {
        "name": "Hayden Woods",
        "mobile": "+61416778433"
      },
      {
        "name": "Emily Woods",
        "mobile": "+61430714333"
      },
      {
        "name": "Jah Osman",
        "mobile": "+61"
      },
      {
        "name": "Richard Woods",
        "mobile": "+61"
      },
      {
        "name": "Michael Woods",
        "mobile": "+61"
      },
      {
        "name": "Carolyne Woods",
        "mobile": "+61"
      },
      {
        "name": "Roma Stanley",
        "mobile": "+61"
      },
      {
        "name": "Bob Stanley",
        "mobile": "+61"
      }
    ],
    "exclusions": [
      [9,10],
      [9,0],
      [10,0]
    ]
  }

  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();

  const coreApi = kc.makeApiClient(k8s.CoreV1Api);
  const jobApi = kc.makeApiClient(k8s.BatchV1Api);

  const id = uuidv4();
  const configTemplate = fs.readFileSync("./src/templates/configmap.yaml")
  const configTemplateCompiled = handlebars.compile(configTemplate.toString());
  const configYaml = configTemplateCompiled({
    id: id,
    data: JSON.stringify(config),
  });

  const jobTemplate = fs.readFileSync("./src/templates/job.yaml")
  const jobTemplateCompiled = handlebars.compile(jobTemplate.toString());
  const jobYaml = jobTemplateCompiled({
    id: uuidv4(),
  });

  const configJson = yaml.load(configYaml)
  const jobJson = yaml.load(jobYaml)

  console.log(configJson)
  console.log(jobJson)

  coreApi.createNamespacedConfigMap("secretsanta", configJson);
  jobApi.createNamespacedJob("secretsanta", jobJson);
}

module.exports = {
  create
}