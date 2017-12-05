using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

public partial class AJAX_UploadPic : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string img;
        try
        {
            img = Request["img"].ToString();
            byte[] picBytes = Convert.FromBase64String(img);
            Stream stream = new MemoryStream(picBytes);
            //将流转回Image，用于将PNG格式照片转为jpg，压缩体积以便保存。
            Image imgae = Image.FromStream(stream);
			imgae.Save(Server.MapPath(DateTime.Now.ToString("yyyyMMddHHmmss") + ".jpg"), ImageFormat.Jpeg);
            Response.Write("OK");
        }
        catch (Exception msg)
        {
            img = null;
            Response.Write(msg);
            return;
        }
    }
}
