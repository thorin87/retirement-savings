using ApiConnector.Model;
using Excel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.IO;
using ExcelInterop = Microsoft.Office.Interop.Excel;

namespace DataDownloader
{
    internal class FundParser
    {
        internal static IReadOnlyCollection<Rate> ParseNN(string contents)
        {
            var result = new HashSet<Rate>();
            object deserializedJson = JsonConvert.DeserializeObject(contents);//,  new JsonConverter[] { new JavaScriptDateTimeConverter() });
            //TODO: sprawdzić RestRequest.DateFormat Unix Timestamps
            if(deserializedJson == null)
            {
                return result;
            }
            JArray deserializedJsonJArray = deserializedJson as JArray;
           
            foreach (JToken course in deserializedJsonJArray[1])
            {
                DateTime courseDate = new DateTime(1970, 1, 1).AddDays((int)(course.First.Value<long>() / 86400000));
                result.Add(new Rate(courseDate, course.Last.Value<decimal>()));
            }
            
            return result;
        }

        internal static IReadOnlyCollection<Rate> ParsePZU(string excelFilePath)
        {
            var result = new HashSet<Rate>();

            #region fix column count by re-save
            string fullExcelFilePath = Path.Combine(Directory.GetCurrentDirectory(), excelFilePath);
            ExcelInterop.Application xl = new ExcelInterop.Application();
            ExcelInterop.Workbook wb = xl.Application.Workbooks.Open(fullExcelFilePath);
            wb.Activate();
            wb.Save();
            wb.Close();
            xl.Quit();
            #endregion

            FileStream stream = File.Open(excelFilePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            IExcelDataReader excelReader = ExcelReaderFactory.CreateBinaryReader(stream);
            DataSet dataset = excelReader.AsDataSet();

            bool firstRow = true;
            foreach (DataRow row in dataset.Tables[0].Rows)
            {
                if (firstRow)
                {
                    firstRow = false;
                    continue;
                }
                //-2 poniżej bo https://support.microsoft.com/en-us/help/214326/excel-incorrectly-assumes-that-the-year-1900-is-a-leap-year
                DateTime courseDate = new DateTime(1900, 1, 1).AddDays(Convert.ToInt32(row[0]) - 2);
                result.Add(new Rate(courseDate, Convert.ToDecimal(row[1])));
            }
            
            excelReader.Close();

            return result;
        }
    }
}