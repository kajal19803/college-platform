import fs from "fs";

import path from "path";

import xlsx from "xlsx";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function normalizeCollegeName(
  name: string
) {

  return name
    .toLowerCase()

    .replace(
      /indian institute of technology/g,
      "iit"
    )

    .replace(
      /national institute of technology/g,
      "nit"
    )

    .replace(
      /indian institute of information technology/g,
      "iiit"
    )

    .replace(
      /university/g,
      ""
    )

    .replace(
      /institute/g,
      ""
    )

    .replace(
      /college/g,
      ""
    )

    .replace(
      /engineering/g,
      ""
    )

    .replace(
      /technology/g,
      ""
    )

    .replace(
      /[\(\)\-,]/g,
      ""
    )

    .replace(
      /\s+/g,
      " "
    )

    .trim();
}

async function importCutoffs() {

  const folderPath =
    path.join(
      process.cwd(),
      "data",
      "cutoffs"
    );

  const files =
    fs.readdirSync(folderPath);

  const allColleges =
    await prisma.college.findMany({

      select: {
        id: true,
        name: true,
      },
    });

  for (const file of files) {

    if (
      !file.endsWith(".xlsx")
    ) {
      continue;
    }

    console.log(
      `Importing ${file}`
    );

    const filePath =
      path.join(
        folderPath,
        file
      );

    const workbook =
      xlsx.readFile(filePath);

    const sheetName =
      workbook.SheetNames[0];

    const sheet =
      workbook.Sheets[sheetName];

    const rows: any[] =
      xlsx.utils.sheet_to_json(
        sheet
      );

    const yearMatch =
      file.match(/\d{4}/);

    const roundMatch =
      file.match(
        /Round(\d+)/i
      );

    const year =
      yearMatch
        ? Number(
            yearMatch[0]
          )
        : 2024;

    const round =
      roundMatch
        ? Number(
            roundMatch[1]
          )
        : 1;

    for (const row of rows) {

      try {

        const rawCollegeName =
          row["Institute"] ||
          row[
            "Institute Name"
          ] ||
          row["College"] ||
          "";

        if (
          !rawCollegeName
        ) {
          continue;
        }

        const normalizedExcelName =
          normalizeCollegeName(
            rawCollegeName
          );

        const matchedCollege =
          allColleges.find(
            (college) => {

              const normalizedDbName =
                normalizeCollegeName(
                  college.name
                );

              return (
                normalizedDbName.includes(
                  normalizedExcelName
                ) ||

                normalizedExcelName.includes(
                  normalizedDbName
                )
              );
            }
          );

        if (
          !matchedCollege
        ) {

          console.log(
            `College not found: ${rawCollegeName}`
          );

          continue;
        }

        const course =
          row[
            "Academic Program Name"
          ] ||
          row["Course"] ||
          "Unknown";

        const category =
          row["Category"] ||
          row[
            "Seat Type"
          ] ||
          "General";

        const openingRank =
          Number(
            row[
              "Opening Rank"
            ]
          ) || null;

        const closingRank =
          Number(
            row[
              "Closing Rank"
            ]
          ) || 0;

        if (
          !closingRank
        ) {
          continue;
        }

        await prisma.cutoff.create({

          data: {

            year,

            round,

            exam:
              "JEE Main",

            course,

            category,

            openingRank,

            closingRank,

            collegeId:
              matchedCollege.id,
          },
        });

        console.log(
          `Imported cutoff for ${matchedCollege.name}`
        );

      } catch (error) {

        console.log(error);
      }
    }
  }

  console.log(
    "All cutoffs imported successfully 🔥"
  );
}

importCutoffs()
  .catch(console.error)
  .finally(async () => {

    await prisma.$disconnect();
  });
