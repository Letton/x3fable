import fetchJson from "../../lib/fetchJson";
import { marked } from "marked";

export default async function handler(req, res) {
  const response = await fetchJson(
    "https://gitlab.informatics.ru/api/v4/projects/5102/repository/tree?ref=Updates",
    {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": process.env.GITLAB_TOKEN,
      },
    }
  );
  const fileName = response[response.length - 1].name;
  const info = await fetchJson(
    `https://gitlab.informatics.ru/api/v4/projects/5102/repository/files/${fileName}/blame?ref=Updates`,
    {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": process.env.GITLAB_TOKEN,
      },
    }
  );
  const textResponse = await fetch(
    `https://gitlab.informatics.ru/api/v4/projects/5102/repository/files/${fileName}/raw?ref=Updates`,
    {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": process.env.GITLAB_TOKEN,
      },
    }
  );
  const rawText = await textResponse.text();
  const text = marked.parse(rawText);
  const update = {
    id: info[0].commit.id,
    author: info[0].commit.committer_name,
    date: info[0].commit.committed_date,
    text: text,
  };
  return res.status(200).json({ update });
}
