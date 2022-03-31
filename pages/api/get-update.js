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
  const file = response[response.length - 1];
  const info = await fetchJson(
    `https://gitlab.informatics.ru/api/v4/projects/5102/repository/files/${file.name}/blame?ref=Updates`,
    {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": process.env.GITLAB_TOKEN,
      },
    }
  );
  const textResponse = await fetch(
    `https://gitlab.informatics.ru/api/v4/projects/5102/repository/files/${file.name}/raw?ref=Updates`,
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
    id: file.id,
    author: info[info.length - 1].commit.committer_name,
    date: info[info.length - 1].commit.committed_date,
    text: text,
  };
  return res.status(200).json({ update });
}
