import fs from "fs";

import path from "path";

import csv from "csv-parser";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const results: any[] = [];

const filePath = path.join(
  process.cwd(),
  "data",
  "engineering colleges in India.csv"
);

fs.createReadStream(filePath)

  .pipe(csv())

  .on("data", (data) => {

    results.push(data);
  })

  .on("end", async () => {

    try {

      console.log(
        `Importing ${results.length} colleges...`
      );

      const formattedData =
        results.map((college) => ({

          name:
            college["College Name"]?.trim() ||
            "Unknown College",

          location: `${college["City"] || ""}, ${college["State"] || ""}`,

          fees:
            Number(
              college["Average Fees"]
            ) || 0,

          rating:
            Number(
              college["Rating"]
            ) || 0,

          description:
            college["Description"] ||
            college["Courses"] ||
            "No description available",

          image:
            college["Image URL"] || null,

          coursesOffered:
            Number(
              college["Courses Offered"]
            ) || 0,

          placementRating:
            Number(
              college["Placement Rating"]
            ) || 0,

          examsAccepted:
            college["Exams Accepted"] ||
            "JEE Main",

          nirfRanking:
            college["NIRF Ranking"] || null,

          collegeType:
            college["College Type"] ||
            "Engineering",

          campusSize:
            college["Campus Size"] || null,

          totalStudents:
            Number(
              college["Total Students"]
            ) || 0,

          totalFaculty:
            Number(
              college["Total Faculty"]
            ) || 0,

          establishedYear:
            Number(
              college["Established Year"]
            ) || 0,

          facilities:
            college["Facilities"] || null,

          courses:
            college["Courses"] || null,
        }));

      await prisma.college.createMany({

        data: formattedData,

        skipDuplicates: true,
      });

      console.log(
        "✅ Colleges imported successfully"
      );

    } catch (error) {

      console.error(
        "❌ Import failed:",
        error
      );

    } finally {

      await prisma.$disconnect();
    }
  });
