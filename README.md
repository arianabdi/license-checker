

# Installation

Run this command on your server

```agsl
bash <(curl -Ls https://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@raw.githubusercontent.com/arianabdi/license-checker/main/scripts/installation.sh --ipv4)
```








































































۱۶  اسفند ۱۴۰۱

# ساختار دیتابیس

## کالکشن Request

![image-20230307222106804](README.assets/image-20230307222106804.png)

در دیتابیس بخش request ها (درخواست ها) رو داریم که با دو collection در ارتباط هستند. اول کالکشن payment و بعد کالکشن key . یعنی وقتی یک request ایجاد میشه، در وحله اول یک paymentId براش ایجاد میشه. هر وقت این payment  انجام شد و تایید شد،  اگر کاربر عادی بود که فقط یک کلید براش ساخته میشه و اگر فروشنده بود به تعداد کلید هایی که خرید کرده، براش کلید صادر میشه



قبل از اینکه 



```json
//request
{
    _id:"63838747f27f5a390d86d8de",
    userId:"63838747f27f5a390d86d8de", //buyer 
    // وضعیت درخواست دارای حالات زیر است

    //اگر نوع درخواست "تایید پرداخت" باشه
    //منتظر پرداخت
    //پرداخت شده
    //ردشده
    //منقضی شده
    
    //اگر نوع درخواست "تغییر سرویس" باشه
    //درحال بررسی
    //انجام شده
    //رد شده
    //نیاز به تغییر
    
    //اگر نوع درخواست فعال سازی باشه
    //درحال بررسی
    //انجام شده
    //نیاز به تغییر
    
    requestType: "change_service",

    //ما چند نوع درخواست داریم
    //تغییر سرویس: زمانی است که کاربر درخواست تغییر به خاطر مشکل داده
    //فعال سازی:زمانی است که کاربر کلید رو خریداری و دریافت کرده ولی هنوز فعال نیست
    //تایید پرداخت: کاربر اقدام به خرید یک یا چند کلید کرده
    

	//فعال سازی کلید  
    params:{
        activatorId: "63838747f27f5a390d86d8de", //کسی که داره این کلید رو فعال میکنه
		consumerId: "63838747f27f5a390d86d8de", // کسی که داره کلید براش فعال میشه
        keyId: "63838747f27f5a390d86d8de", // 
        serviceId: "63838747f27f5a390d86d8de", //سرویس جدیدی که درخواست شده
    	status: ''
    },
    
    
    //تغییر سرویس
    params:{
        editorId: "63838747f27f5a390d86d8de", //کسی که داره درخواست تغییر میده
        keyId: "63838747f27f5a390d86d8de", //کلیدی که قراره سرویس اش تغییر کنه
       	serviceId: "63838747f27f5a390d86d8de", //سرویس جدیدی که درخواست شده
    	status: ''
    },
    
     //تایید پرداخت
    params:{
    	paymentId:"63838747f27f5a390d86d8de",
        numberOfKeys:5, //تعداد کلید هایی که میخواییم بخریم
        packageId: "63838747f27f5a390d86d8de", // نوع کلید هایی که قراره خریداری بشه مثلا عادی یا حرفه ای
       keys:[], // بعد از اینکه پرداخت انجام شد به تعداد عدد بالا کلید ساخته و ایدیشون در این آرایه قرار خواهد گرفت
		status: ''
	}
}




//key
{
    _id:"63838747f27f5a390d86d8de", // ایدی کلید
    consumerId: "63838747f27f5a390d86d8de", //کسی که از کلید استفاده میکنه
    buyerId: "63838747f27f5a390d86d8de", // کسی که کلید رو خریداری کرده
    isActive: false,//این کلید خریداری شده ولی هنوز فعال نشده 
    requesId: "63838747f27f5a390d86d8de", // این کلید برای کدام درخواست است
    country: "germany",
    createdAt: "yyyy-dd-mm",// تاریخ ایجاد کلید
    expireAt: "yyyy-dd-mm",// تاریخ انقضای کلید
    serviceId: "63838747f27f5a390d86d8de", // سرویس مثلا تروجان است
    packagId: "63838747f27f5a390d86d8de", //شناسه پکیجی که خریده، ممکنه عادی باشه ممکنه حرفه ای باشه
    serverId: "63838747f27f5a390d86d8de",//مثلا روی سرور aruba-12 هست
    paymentId: "63838747f27f5a390d86d8de",//ایدی پرداختی که موفق بوده تا این کلید ساخته بشه
    status: "active", //یا فعال شده یا نشده
	isSuspended: true, //در صورتی که بخواهیم کلیدی رو غیر فعال کنیم حتی اگه منقضی نشده
    //حالات ممکن
    
    // فعال: زمانی که بدون مشکل کار میکنه
    // منقضی شده: زمانی که تاریخ انقضا اش گذشته 
    //نیاز به تغییر: زمانی که کاربر درخواست تغییر سرویس داده 
    //در حال بررسی:زمانی که ما نیاز به تغییر رو باز کردیم و در حال تغییر هستیم
    //مشکل دار: زمانی است که ما فهمیدیم که مثلا سرویس تروجان روی سرور اروبا-۱۲ مشکل داره
    //میایم و تمام کلید هایی که با این آیدی سرویس و این آیدی سرور هست رو به حالت مشکل دار میکنیم
    
   
    //داده ای که هر سرویس ممکنه داشته باشه
    //مثلا تروجان یه نوع داده داره و اس اس اچ یه نوع داده
    data: {
        ip: "217.56.56.48",
        port: "41066",
        username: “hami_1”, // از طریق ایدی کاستومر خودش پر میکنه
        password: “hakl282390h82”, //اینم رندوم تولید میشه
    }
}



```















کالکشن keys

هر شخص یا فروشنده میتونه تعدادی کلید خریداری کنه که این کلید ها فعال نیستند . حالا کاربر میاد و دونه دونه این کلید ها رو یا میفروشه یعنی پولشو نقدی میگیره و برای یکی فعال میکنه خودش یا برای خودش فعال میکنه. در این زمان برای اینکه کلید رو فعال کنه باید بگه این کلید میخواد چه سرویسی داشته باشه، مثلا میخواد ssh باشه یا trojan و قراره برای چه کسی فعال بشه. برای خودم یا دیگری.















































# ساختار دیتابیس



کالکشن ها



## سرور ها 

```json
//servers

[
   {
      id: ssssssssss1,
      country: “xxxxxxxx”,
      ip: “xx.xx.xx.xx”,
      port: “xxxxxxxx”,
      username: “root”,
      password: “xxxxxxxx”,
      limitNumberOfUsers: 10,  // 20 Users
      createdAt: “yyyy-dd-mm”,
      info: {},  // server resources specifications
      services: [
         {
             service_name: “trojan-grpc-tls”,
             status: “active”,
             disruptions: [‘hamrahe-aval’, ‘irancell’]
             data: {
                 key: “trojan://366a2ebd-059c-4186-aea4-37b46b
7f5649@germany.highwaythreebackup.ga:443?peer=germany.highwayt
hreebackup.ga&sni=germany.highwaythreebackup.ga&alpn=http/1.1#
germany.highwaythreebackup.ga_Trojan”
             }
         },
         {
             disruptions: []
             service_name: “vless-tls”,
             status: “deactive”,
             data: {}
         },
      ]
   }
]
```





## خدمات 

در این کاکشن خدمات امون رو اضافه میکنیم،  در اینجا خدمات ما انواع VPN است.

```d
//service

[
   {
      id: xxxxxxxx1,
      service_name: “ssh-direct”,
      price: 3,
      plans: [1, 3, 6, 12], // number of month of the plan
      createdAt: “yyyy-dd-mm”,
   },
]
```





## پکیج ها

```json
// Invoices

[
   {
      id: pkgpkgpkgpkg1,
      package_name: “dynamic”,
      numberOfChangePerMonth: 10,
      numberOfActiveUsers: 4,
      canChangeToWhichService: ‘all’, // [‘all’, ‘same’,]
      createdAt: “yyyy-dd-mm”,
   },
   {
      id: pkgpkgpkgpkg2,
      package_name: “normal”,
      numberOfChangePerMonth: 5,
      numberOfActiveUsers: 2,
      canChangeToWhichService: ‘same’, // [‘all’, ‘same’,]
      createdAt: “yyyy-dd-mm”,
   },
]
```





## کلید ها

 هر کلیدی که برای کاربر ساخته میشه اینجا قرار داده میشه. این کلید دارای یک مدت زمان استفاده است و در روز بعد از تاریخ expire این کلید غیر فعال میشه 

```json
// Invoices

[
   {
      id: xxxxxxxx
      request_id: xxxxxxxx
      user_id: xxxxxxxx,
      service_id: xxxxxxxx1,    //ssh-direct
      server_Id:ssssssssss1,
      createdAt: “yyyy-dd-mm”,
      expireAt: “yyyy-dd-mm”,
      status: “active      expireAt: “yyyy-dd-mm””
      data: {
         ip: “zzzzzzzz”,
         port: “zzzzzzzz”,
         username: “zzzzzzzz”,
         password: “zzzzzzzz”,
      }
   },
]
```





## کاربران

داده هایی که از کاربران نیاز داریم به شکل زیر است:

```json
// Users

[
   {
      id: xxxxxxxx,
      email: xxxxxxxx,
      username: xxxxxxxx,
      firstname: “xxxxxxxx”,
      lastname: “xxxxxxxx”,
      password: “xxxxxxxx”,
      mobile_operator: “irancell”, // [‘irancell’, ‘hamrahe-aval’, ‘rightell’]
      createdAt: “yyyy-dd-mm”,
   }
]
```



## درخواست ها

هر کاربر ممکنه درخواست VPN بکنه. حالا ما باید بررسی کنیم که آیا این درخواست چیه و آیا پرداخت اش انجام شده یا نه. حالا کدوم سرور خالیه که این شخص رو توش قرار بدیم و درخواست رو تایید شده کنیم. 

```json
// Invoices

[
   {
      id: xxxxxxxx
      user_id: uuuuuuuu1,
      service_id: xxxxxxxx2,
      package_id: pkgpkgpkgpkg1,
      payment_id: pppppppp1,
      request_purpose: ‘new_service’, //[‘new_service’, ‘need_to_change_service’]
      key_id: kkkkkkkk1,
      show_key: false,      
      status: “Pending”,      // [active, not-active, wait_for_purchase, Pending]
      isLocked: false,           // if status=Pending and request_purpose=‘need_to_change_service’ then isLocked=true 
      createdAt: “yyyy-dd-mm”,
      serviceStartsAt: “yyyy-dd-mm”,
      serviceEndsAt: “yyyy-dd-mm”,
      data: {}
   }
]
```





## پرداخت ها



```json
// Payment

[
   {
      id: pppppppp1,
      user_id: uuuuuuuu1,
      request_id: xxxxxxxx2,
      service_id: xxxxxxxx2,  
      status: “not-complete”,
      peyment_method: “”,  // [‘zarinpal’, ‘crypto’, ‘manual’] 
      transaction_address: “”,
      createdAt: “yyyy-dd-mm”,
      data: {}
   }
]
```



