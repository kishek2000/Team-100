'''
This is a cheat code lmao
'''

import json
import requests
import pprint
from urllib.parse import quote
from justwatch import JustWatch


def region_service_filters(region='AU'):
    just_watch = JustWatch(country=region)
    aus_providers = just_watch.get_providers()
    plist = []
    for item in aus_providers:
        plist.append({"full": item["clear_name"], "short": item["short_name"],
                      "monetisation": item["monetization_types"]})
    return plist


filtered_search({"query": "Avengers", "providers": ["nfx"]})


# providers = ["nfx", "ftp", "stn", "prv", "dnp,""ply", "itu", "atp", "nnw", "ytr", "doc", "hay", "msf",
#              "spl", "ivw", "sbs", "yot", "tpl", "qfx", "qfs", "mbi",  "nfk", "knp", "tbv", "gdc", "cru", "act", "pfx"]

# filter_map = {"Netflix": 0, "Foxtel Now": 1, "Stan": 2, "Amazon Prime Video": 3, "Disney Plus": 4, "Google Play": 5,
#               "Itunes": 6, "Apple TV": 7, "Nine Now": 8, "YouTube Premium": 9, "DocPlay": 10, "Hayu": 11, "Microsoft": 12,
#               "Seven Plus": 13, "iView": 14, "SBS On Demand": 15, "Youtube": 16, "Ten Play": 17, "QuickFlix": 18,
#               "QuickFlix Store": 19, "Mubi": 20, "Netflix Kids": 21, "Kanopy": 22, "Tubi": 23, "GuideDoc": 24, "Crunchyroll": 25,
#               "AcornTV": 26, "Pantaflix": 27}
