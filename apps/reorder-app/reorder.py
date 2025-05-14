import pandas as pd
import glob
import os

dirname = os.path.dirname(__file__)
pathToinputFiles = os.path.join(dirname, "input/*.csv")
pathToOutputFiles = os.path.join(dirname, "output/")
print(pathToinputFiles)
print(pathToOutputFiles)
columns_to_keep = ["Pub-Date","Line-Notes", "Title", "Sub-Title", "Author-Artist", "Qty-Ordered", "List-Price", "Net-Price"]


# index here will be used to name files in the order they are processed
idx = 1
for fname in glob.glob(pathToinputFiles):
  df = pd.read_csv(fname)
  df = df[columns_to_keep]


  # Unit price = net price
  # Line price = unit price * quantity
  df['Line Price'] = df['Net-Price'] * df['Qty-Ordered']


  # rename columns to desired output names
  df = df.rename(columns={
      "Pub-Date": "Pub Date",
      "Line-Notes":"Top Notes",
      "Author-Artist":"Author", 
      "Qty-Ordered":"Qty", 
      "List-Price":"List Price",
      "Net-Price":"Unit Price"
    })

  # reorder output to desired order
  df = df.reindex(columns=["Vendor", "PO", "Received", "Fund Code"] + df.columns.tolist())


  # save file to output folder, in order with index appended on file name
  df.to_csv(pathToOutputFiles + "output-" + str(idx) + ".csv", index=False)
  idx += 1